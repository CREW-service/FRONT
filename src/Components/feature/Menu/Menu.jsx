import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AuthApi from "shared/api";
import Modal from "react-modal";
import { useCookies } from "react-cookie";
import Kakaologin from "../Kakaologin/Kakaologin";
import MENUICON from "./menu_ic.png";

Modal.setAppElement("#root"); // 접근성을 위해 앱의 루트 요소 설정

function Menu() {
  const [isLogin, setIsLogin] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["authorization"]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const logOutHandler = async () => {
      removeCookie("authorization"); // Remove the 'authorization' cookie
      alert("로그아웃 했습니다.")
      setIsModalOpen(false)
  };

  useEffect(() => {
    if (!cookies.authorization) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [cookies]);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openLoginModal = () => {
    setIsModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <div>
      <StMenuButton type="button" onClick={handleButtonClick}>
        <StImg src={MENUICON} alt="알림 아이콘" />
      </StMenuButton>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="메뉴"
        style={modalStyles} // 모달 스타일 적용
      >
        {/* 모달 내용 */}
        <StModalContainer>
          {isLogin ? (
            <StModalButton type="button" onClick={logOutHandler}>
              로그아웃
            </StModalButton>
          ) : (
            <StModalButton type="button" onClick={openLoginModal}>
              로그인
            </StModalButton>
          )}
          <StModalButton type="button">설정</StModalButton>
        </StModalContainer>
      </Modal>

      <Modal
        isOpen={isLoginModalOpen}
        onRequestClose={closeLoginModal}
        contentLabel="로그인"
        style={loginModalStyes}
      >
        {/* 새로운 모달 내용 */}
        <Kakaologin />
      </Modal>
    </div>
  );
}

const StMenuButton = styled.button`
  background: #fff;
  border: 0;
  position: relative;
  width: 50px;
  height: 50px;
`;

const StImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const loginModalStyes = {
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    borderRadius: "10px",
    background: "#FFF",
    boxShadow: "0px 0px 6px 0px rgba(0, 0, 0, 0.2)",
    width: "300px",
    height: "264px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000, // Added z-index property
  },
};
const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0)",
    zIndex: 1000, // Added z-index property
  },
  content: {
    position: "absolute",
    top: "9%",
    left: "14%",
    // transform: "translate(-50%, -50%)",
    border: "none",
    borderRadius: "0px 10px 10px 0px",
    background: "#FFF",
    boxShadow: "0px 0px 6px 0px rgba(0, 0, 0, 0.20)",
    width: "228px",
    maxHeight: "623px",
    overflowY: "auto",
    padding: "16px",
  },
};

const StModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StModalButton = styled.button`
  padding: 14px 73px;
  background: #fff;
  border: 0;

  color: var(--gr-black, #222);
  text-align: center;

  /* Title/L */
  font-size: 22px;
  font-family: Pretendard;
  font-weight: 500;
  line-height: 28px;

  border-bottom: 1px solid #f1f1f1;
`;

export default Menu;
