import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

function Captinmodal({ setModalOpen }) {
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
        {" "}
        X
      </button>
      <button type="button">마감</button>
      <button type="button">수정</button>
      <button type="button">삭제</button>
    </div>
  );
}

export default Captinmodal;

Captinmodal.propTypes = {
  setModalOpen: PropTypes.node.isRequired,
};
