import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import KakaoBtn from "./login_popup_kakao.png";

function Kakaologin({closeLoginModal}) {
  const loginUrl = `${process.env.REACT_APP_BACKEND_SERVER_URL}/auth/kakao`;
  return (
    <StContainer>
      <StLabel>간편 로그인</StLabel>
      <Link to={loginUrl}>
        <StImg src={KakaoBtn} alt="kakao login button" />
      </Link>
      <StCancelButton type="button" onClick={closeLoginModal}>취소</StCancelButton>
    </StContainer>
  );
}

Kakaologin.propTypes = {
  closeLoginModal: PropTypes.node.isRequired,
};

export default Kakaologin;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%; /* 부모 요소의 높이를 100%로 설정 */
`;

const StLabel = styled.label`
  margin-top: 24px;
  margin-bottom: 40px;
  color: var(--gr-black, #222);
  text-align: center;

  /* Body/L */
  font-size: 16px;
  font-family: Pretendard;
  font-weight: 500;
  line-height: 24px;
`;

const StImg = styled.img`
  width: 250px;
  height: 56px;
`;

const StCancelButton = styled.button`
  border: 0;
  margin-top: 40px;
  border-radius: 35px;
  background: var(--gr-white, #fff);

  color: var(--gr-deep, #3e4756);
  text-align: center;

  width: 250px;
  height: 56px;

  /* Title/M */
  font-size: 18px;
  font-family: Pretendard;
  font-weight: 500;
  line-height: 24px;

  cursor: pointer;
`;
