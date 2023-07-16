import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Body from "./Body/Body";
import Footer from "./Footer/Footer";

function Layout({ children }) {
  return (
    <StLayoutBox className="content">
      <Header />
      <Body>
        <Outlet/>
      </Body>
      <Footer />
    </StLayoutBox>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

const StLayoutBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Header와 Footer 사이에 공간을 균등하게 배분 */
  align-items: center;
  max-width: 360px;
  width: 100%;
  min-height: 100vh; /* 최소 높이를 뷰포트 높이로 설정하여 Footer가 항상 맨 아래에 위치하도록 함 */
  margin: 0 auto;
  /* border: solid 5px #30a2ff;
  border-radius: 30px; */
  overflow: hidden;
  height: 100vh;

  @media (max-width: 1100px) {
    max-width: 100%;
    border-width: 2px;
    border-radius: 15px;
  }
`;
