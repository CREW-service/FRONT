import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

function Layout({ children }) {
  return <StLayoutBox className="content">{children}</StLayoutBox>;
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

const StLayoutBox = styled.div`
  width: 360px;
  margin: 0 auto;
`;
