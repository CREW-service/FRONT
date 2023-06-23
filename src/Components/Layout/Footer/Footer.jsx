import React from "react";
import styled from "styled-components";
import Homeicon from "./Homeicondefualt.png";
import Homeiconactive from "./Homeiconactive.png"
import Writingicon from "./Writingicon.png";
import Writingiconactive from "./Writingiconactive.png"
import Mypageicon from "./Mypageicon.png";
import Mypageiconactive from "./Mypageiconactive.png"

function Footer() {
  return (
    <StContainer>
      <StIconBox>
        <StImg src={Homeicon} alt="홈" />
        <StdefualtTxt>홈</StdefualtTxt>
      </StIconBox>
      <StIconBox>
        <StImg src={Writingicon} alt="글쓰기" />
        <StdefualtTxt>글쓰기</StdefualtTxt>
      </StIconBox>
      <StIconBox>
        <StImg src={Mypageicon} alt="마이페이지" />
        <StdefualtTxt>마이페이지</StdefualtTxt>
      </StIconBox>
    </StContainer>
  );
}

export default Footer;

const StContainer = styled.div`
  display: flex;
  width: 100%;
  height: 64px;
  padding: 4px 20px;
  justify-content: center;
  align-items: center;
  gap: 68px;
  flex-shrink: 0;

  background: var(--gr-white, #fff);

  /* shadow1-nav */
  box-shadow: 0px -2px 4px 0px rgba(0, 0, 0, 0.15);
`;

const StIconBox = styled.div`
  display: flex;
  width: 52px;
  height: 62px;
  padding: 4px 12px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
`;
const StImg = styled.img``;

const StActiveTxt = styled.p`
  color: var(--primary-blue, #30a2ff);
  text-align: center;
  font-size: 12px;
  font-family: Pretendard;
  line-height: 20px;
`;

const StdefualtTxt = styled.p`
  color: var(--gr-deep, #3e4756);
  text-align: center;
  font-size: 12px;
  font-family: Pretendard;
  line-height: 20px;
`;
