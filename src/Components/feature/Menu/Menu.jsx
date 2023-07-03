import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import MENUICON from "imgs/menu_ic.png";
import Kakaologin from "Components/feature/Kakaologin/Kakaologin";

const logoutUrl = `${process.env.REACT_APP_BACKEND_SERVER_URL}/auth/logout`;

function Menu() {
  const [isLogin, setIsLogin] = useState(false);
  const [cookies, , removeCookie] = useCookies(["authorization"]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate()

  const logOutHandler = async () => {
      removeCookie("authorization"); // Remove the 'authorization' cookie
      navigate(logoutUrl)
      // alert("로그아웃 했습니다.")
      // setIsModalOpen(false)
  };

  useEffect(() => {
    if (!cookies.authorization) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [cookies]);

  const handleButtonClick = () => {
    setIsModalOpen(!isModalOpen);
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
        {isModalOpen && (
        <StModalOverlay>
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
        </StModalOverlay>
      )}
      </StMenuButton>
      
      <Modal
        isOpen={isLoginModalOpen}
        onRequestClose={closeLoginModal}
        contentLabel="로그인"
        style={loginModalStyes}
      >
        {/* 새로운 모달 내용 */}
        <Kakaologin closeLoginModal={closeLoginModal}/>
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
  position: relative;
`;

const StModalOverlay = styled.div`
  position: absolute;
  top: 117%;
  left: -60%;
  /* right: 100%; */
  /* bottom: 0; */
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 228px;
  /* z-index: 500; */
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


const StModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */

  background: #FFF;
  /* box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.2); */
  height: 656px;
  z-index: 500;
`;

const StModalButton = styled.button`
  padding: 20px 73px;
  background: #fff;
  border: 0;

  color: var(--gr-black, #222);
  text-align: center;

  /* Title/L */
  font-size: 22px;
  font-family: Pretendard;
  font-weight: 500;
  line-height: 28px;

  /* border-top: 1px solid #989797; */
`;

export default Menu;
