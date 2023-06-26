import React from 'react'
import PropTypes from "prop-types";
import styled from 'styled-components';


function Body({ children }) {
  return (
    <StContainer>{children}</StContainer>
  )
}


Body.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default Body

const StContainer = styled.div`
  width: 100%;
  height: 656px;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;

  &::-webkit-scrollbar {
    width: 0px; /* 스크롤 바 너비 */
  }

  &::-webkit-scrollbar-track {
    background-color: transparent; /* 스크롤 바 트랙 배경색 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent; /* 스크롤 바 썸 배경색 */
  }
`