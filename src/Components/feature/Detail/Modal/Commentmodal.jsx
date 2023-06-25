import React, { useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import PropTypes from "prop-types";
import AuthApi from "shared/api";

function Commentmodal({ boatId, comment, renderTriggerHandler, closeModal }) {
  console.log("comment", comment);
  const modalRef = useRef(null);

  useEffect(() => {
    const handler = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal(null);
      }
    };

    document.addEventListener("mousedown", handler);
    // document.addEventListener('touchstart', handler); // 모바일 대응

    return () => {
      document.removeEventListener("mousedown", handler);
      // document.removeEventListener('touchstart', handler); // 모바일 대응
    };
  }, [closeModal]);

  const [cookies] = useCookies(["authorization"]);

  // const changeCommentHandler = (event) => {
  //   setChangedComment(event.target.value);
  // };

  const deleteComment = async () => {
    try {
      const deletedAt = new Date();
      const config = {
        headers: {
          authorization: cookies.authorization,
        },
      };
      const newDeleteData = {
        deletedAt,
      };

      const res = await AuthApi.deleteComment(
        boatId,
        comment.commentId,
        newDeleteData,
        config
      );

      alert(res.data.message);
      renderTriggerHandler();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      id={comment.commentId}
      style={{
        border: "1px solid ",
        width: "200px",
        height: "250px",
      }}
      ref={modalRef}
    >
      <button type="button">X</button>
      <button type="button">수정</button>
      <button type="button" onClick={deleteComment}>
        삭제
      </button>
    </div>
  );
}

export default Commentmodal;

Commentmodal.propTypes = {
  closeModal: PropTypes.node.isRequired,
  comment: PropTypes.node.isRequired,
  renderTriggerHandler: PropTypes.node.isRequired,
  boatId: PropTypes.node.isRequired,
};
