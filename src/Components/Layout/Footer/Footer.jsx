import React, {  useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import Homeicon from "imgs/home_ic.png";
import Homeiconactive from "imgs/home_ic_C.png";
import Writingicon from "imgs/edit_ic.png";
import Writingiconactive from "imgs/edit_ic_C.png";
import Mypageicon from "imgs/mypage_ic.png";
import Mypageiconactive from "imgs/mypage_ic_C.png";

function Footer() {
  const [currentPage, setCurrentPage] = useState("");
  const {pathname} = useLocation();
  const navigate = useNavigate();

  const onClick = (url) => {
    navigate(url);
  };

  useEffect(()=>{
    setCurrentPage(pathname)
  },[pathname])

  return (
    <StContainer>
      {currentPage === "/main" ? (
        <StIconBox>
          <StImg src={Homeiconactive} alt="홈" />
        </StIconBox>
      ) : (
        <StIconBox onClick={() => onClick("/main")}>
          <StImg src={Homeicon} alt="홈" />
        </StIconBox>
      )}
      {currentPage === "/writing" ? (
        <StIconBox>
          <StImg src={Writingiconactive} alt="글쓰기" />
        </StIconBox>
      ) : (
        <StIconBox onClick={() => onClick("/writing")}>
          <StImg src={Writingicon} alt="글쓰기" />
        </StIconBox>
      )}
      {currentPage === "/mypage" ? (
        <StIconBox>
          <StImg src={Mypageiconactive} alt="마이페이지" />
        </StIconBox>
      ) : (
        <StIconBox onClick={() => onClick("/mypage")}>
          <StImg src={Mypageicon} alt="마이페이지" />
        </StIconBox>
      )}
    </StContainer>
  );
}

export default Footer;

const StContainer = styled.div`
  display: flex;
  width: 100%;
  height: 64px;
  /* padding: 4px 20px; */
  justify-content: space-around;
  align-items: center;

  background: var(--gr-white, #fff);

  /* shadow1-nav */
  box-shadow: 0px -2px 4px 0px rgba(0, 0, 0, 0.15);
  z-index: 9999;
`;

const StIconBox = styled.div`
  display: flex;
  padding: 4px 12px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  cursor: pointer;
`;
const StImg = styled.img`
  width: 52px;
  height: 62px;
`;
