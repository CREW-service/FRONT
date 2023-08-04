import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Kakaologin from "Components/feature/Kakaologin/Kakaologin";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import AuthApi from "shared/api";
import { currentUserIdAtom, isLoginAtom } from "Recoil/recoilAtoms";
import { useRecoilState, useSetRecoilState} from "recoil";
import ICON from "imgs/drwicon.gif";
// import LOGO from "imgs/CREW_B 1.png";
import LOGO from "imgs/B_LOGO.svg";

const introContent = `내 주변에서 함께하고 싶은 모임을 만들거나 새로운 모임에 참여해보세요!`;

function Onboarding() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cookies, setCookie] = useCookies(["authorization"]);
  const [, setCurrentUserId] = useRecoilState(currentUserIdAtom);
  const setIsLogin = useSetRecoilState(isLoginAtom);
  const navigate = useNavigate();

  const getUserInfo = async () => {
    try {
      const config = {
        headers: {
          // 쿠키를 헤더에 추가
          authorization: cookies.authorization,
        },
      };

      const res = await AuthApi.getCurrentUser(config);
      setCurrentUserId(res.data.userId);
    } catch (err) {
      // 로그인한 유저 정보를 받아오지 못했음
    }
  };

  useEffect(() => {
    if (cookies.authorization) {
      goingMainHandler();
    }

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      const now = new Date();
      const expirationDate = new Date(now.getTime() + 2 * 60 * 60 * 1000); // 2시간 후의 시간을 계산

      setCookie("authorization", `Bearer ${token}`, expirationDate);
      getUserInfo();
      setIsLogin(true);
      navigate("/main");
    }
  });

  const closeLoginModal = () => {
    setIsModalOpen(false);
  };

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const goingMainHandler = () => {
    navigate("/main");
  };

  return (
    <StContainer>
      <StAlign>
        <StICONImg src={ICON} alt="icon" />
        <StLOGOImg src={LOGO} alt="Logo" />
        <StContentTxt>{introContent}</StContentTxt>
        <StLoginButton type="button" onClick={handleButtonClick}>
          로그인
        </StLoginButton>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeLoginModal}
          contentLabel="로그인"
          style={loginModalStyes}
        >
          <Kakaologin closeLoginModal={closeLoginModal} />
        </Modal>
        <StShowButton type="button" onClick={goingMainHandler}>
          둘러보기
        </StShowButton>
      </StAlign>
    </StContainer>
  );
}

export default Onboarding;

const StContainer = styled.div`
  width: 360px;
  height: 800px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: center;

  background: #fff;
`;

const StAlign = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StICONImg = styled.img`
  /* margin-top: 56px; */
  width: 120px;
`;

const StLOGOImg = styled.img`
  width: 250px;
  margin-bottom: 40px;
`;

const StContentTxt = styled.span`
  text-align: center;
  width: 258px;
  margin-bottom: 104px;
  line-height: 130%;
  white-space: pre-line;
`;

const StLoginButton = styled.button`
  border: none;
  border-radius: 35px;
  background: var(--primary-blue, #30a2ff);
  width: 250px;
  height: 56px;
  /* padding: 16px 40px; */
  justify-content: center;
  align-items: center;

  color: var(--gr-white, #fff);
  text-align: center;

  /* Headline/S */
  font-size: 24px;
  font-family: Pretendard;
  font-weight: 500;

  margin-bottom: 16px;
  cursor: pointer;
`;

const StShowButton = styled(StLoginButton)`
  background: var(--gr-light, #a2acbd);
  color: var(--gr-black, #222);

  margin-bottom: 192px;
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
