import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import AuthApi from "shared/api";

function Captainmodal({ boat, setModalOpen, boatId, renderTriggerHandler }) {
  const modalRef = useRef(null);
  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const handler = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false);
      }
    };
    // 빈화면 클릭 모달 off
    document.addEventListener("mousedown", handler);
    // document.addEventListener('touchstart', handler); // 모바일 대응
  }, [setModalOpen]);

  const [cookies] = useCookies(["authorization"]);

  const closeBoat = async () => {
    try {
      const config = {
        headers: {
          authorization: cookies.authorization,
        },
      };
      const payload = {
        isDone: true,
      };
      const res = await AuthApi.closeBoat(boatId, payload, config);
      alert(res.data.message);
      // renderTriggerHandler();
    } catch (err) {
      console.log(err);
    }
  };

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
      const res = await AuthApi.deleteBoat(boatId, newDeleteData, config);
      alert(res.data.message);
      renderTriggerHandler();
    } catch (err) {
      console.log(err);
    }
  };

  // 수정버튼 클릭 에디터 이동
  const navigate = useNavigate();

  const onClick = (url) => {
    navigate(url);
  };

  return (
    <StContainer ref={modalRef}>
      <IsDoneBtn onClick={closeBoat}>마감</IsDoneBtn>
      <EditBtn onClick={() => onClick("/correctionwriting")}>수정</EditBtn>
      <DeleteBtn onClick={deleteBoatList}>삭제</DeleteBtn>
    </StContainer>
  );
}

export default Captainmodal;

Captainmodal.propTypes = {
  boat: PropTypes.node.isRequired,
  setModalOpen: PropTypes.node.isRequired,
  boatId: PropTypes.node.isRequired,
  renderTriggerHandler: PropTypes.node.isRequired,
};

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 156px;
  height: 172px;
`;

const IsDoneBtn = styled.button`
  width: 132px;
  height: 36px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  border-radius: 35px;
  border: none;
  background-color: #30a2ff;
`;

const EditBtn = styled.button`
  width: 132px;
  height: 36px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  border-radius: 35px;
  border: none;
  background-color: #fff;
`;

const DeleteBtn = styled.button`
  width: 132px;
  height: 36px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  border-radius: 35px;
  border: none;
  background-color: #fff;
`;
