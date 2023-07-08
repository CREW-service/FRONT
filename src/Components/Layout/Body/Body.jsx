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

// const StContainer = styled.div`
//   width: 100%;
//   /* height: 656px; */
  
//   overflow-x: hidden;
//   scrollbar-width: thin;
//   scrollbar-color: transparent transparent;

//   height: 100%; /* 컨테이너 높이를 100%로 설정하여 최대 높이를 활용 */
//   overflow-y: auto; /* 내용이 컨테이너를 벗어날 경우 스크롤 표시 */
//   padding: 0 20px; /* 모바일 화면에서 내용이 너비를 벗어나지 않도록 패딩을 추가 */

//   &::-webkit-scrollbar {
//     width: 0px; /* 스크롤 바 너비 */
//   }

//   &::-webkit-scrollbar-track {
//     background-color: transparent; /* 스크롤 바 트랙 배경색 */
//   }

//   &::-webkit-scrollbar-thumb {
//     background-color: transparent; /* 스크롤 바 썸 배경색 */
//   }
// `;

const StContainer = styled.div`
  width: 100%;
  flex: 1; /* 나머지 공간을 가득 채우도록 함 */

  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;

  /* height: 100%; */
  overflow-y: auto;
  padding: 0 20px;

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
