import React from "react";
import styled from "styled-components";
import Homeicon from "./Homeicon.png";
import Writngicon from "./Writingicon.png";
import Mypageicon from "./Mypageicon.png";

function Footer() {
  return (
    <StContainer>
      <StIconBox>
        <StImg src={Homeicon} alt="홈" />
      </StIconBox>
      <StIconBox>
        <StImg src={Writngicon} alt="글쓰기" />
      </StIconBox>
      <StIconBox>
        <StImg src={Mypageicon} alt="마이페이지" />
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
  gap: 64px;
  flex-shrink: 0;

  background: var(--gr-white, #fff);

  /* shadow1-nav */
  box-shadow: 0px -2px 4px 0px rgba(0, 0, 0, 0.15);
`;

const StIconBox = styled.div`
  display: flex;
  margin: 0 auto;
`;
const StImg = styled.img`

`;
