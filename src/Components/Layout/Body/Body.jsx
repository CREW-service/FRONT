import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

function Body({ children }) {
  return <StContainer>{children}</StContainer>;
}

Body.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Body;

const StContainer = styled.div`
  width: 100%;
  flex: 1; /* 나머지 공간을 가득 채우도록 함 */

  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;

  height: 100%;
  overflow-y: auto;
  

  &::-webkit-scrollbar {
    width: 0px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
`;
