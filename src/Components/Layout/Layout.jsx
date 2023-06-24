import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Header from "./Header/Header";
import Body from "./Body/Body";
import Footer from "./Footer/Footer";

function Layout({ children }) {
  return (
    <StLayoutBox className="content">
      <Header />
      <Body>{children}</Body>
      <Footer />
    </StLayoutBox>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

const StLayoutBox = styled.div`
  width: 360px;
  height: 800px;
  margin: 0 auto;
`;
