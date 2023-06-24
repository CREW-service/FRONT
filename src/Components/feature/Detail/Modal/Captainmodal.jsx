import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useCookies } from "react-cookie";
import AuthApi from "shared/api";

function Captainmodal({ setModalOpen, boatId, renderTriggerHandler }) {
  console.log("boat", boatId);
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

  const deleteBoatList = async () => {
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
      const res = await AuthApi.deleteBoatList(boatId, newDeleteData, config);
      alert(res.data.message);
      renderTriggerHandler();
    } catch (err) {
      console.log(err);
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
      <button type="button">마감</button>
      <button type="button">수정</button>
      <button type="button" onClick={deleteBoatList}>
        삭제
      </button>
    </div>
  );
}

export default Captainmodal;

Captainmodal.propTypes = {
  setModalOpen: PropTypes.node.isRequired,
  boatId: PropTypes.node.isRequired,
  renderTriggerHandler: PropTypes.node.isRequired,
};
