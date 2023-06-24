import React, { useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import PropTypes from "prop-types";
import AuthApi from "shared/api";

function Commentmodal({ boatId, comment, renderTriggerHandler, setModalOpen }) {
  console.log(comment);
  const closeModal = () => {
    setModalOpen(false);
  };
  const modalRef = useRef(null);

  useEffect(() => {
    const handler = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    // document.addEventListener('touchstart', handler); // 모바일 대응

    return () => {
      document.removeEventListener("mousedown", handler);
      // document.removeEventListener('touchstart', handler); // 모바일 대응
    };
  }, [setModalOpen]);

  const [cookies] = useCookies(["authorization"]);

  const deleteComment = async () => {
    if (comment !== cookies.authorization) {
      alert("본인의 댓글만 삭제할 수 있습니다.");
      return;
    }

    try {
      const config = {
        headers: {
          authorization: cookies.authorization,
        },
      };

      const res = await AuthApi.deleteComment(boatId, comment.id, config);
      console.log(res);
      alert(res.data.message);
      renderTriggerHandler();
    } catch (err) {
      alert(err.response.data.errorMessage);
    }
  };

  return (
    <div
      style={{
        border: "1px solid ",
        width: "200px",
        height: "250px",
      }}
      ref={modalRef}
    >
      <button type="button" onClick={closeModal}>
        X
      </button>
      <button type="button" onClick={deleteComment}>
        수정
      </button>
      <button type="button">삭제</button>
    </div>
  );
}

export default Commentmodal;

Commentmodal.propTypes = {
  setModalOpen: PropTypes.node.isRequired,
  comment: PropTypes.node.isRequired,
  renderTriggerHandler: PropTypes.func.isRequired,
  boatId: PropTypes.node.isRequired,
};
