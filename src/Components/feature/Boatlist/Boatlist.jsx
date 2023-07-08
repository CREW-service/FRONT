import React from "react";
import styled from "styled-components";
import Kakaomap from "../Kakaomap/Kakaomap";

function Boatlist() {
  return (
    <StContainer>
      <Kakaomap />
    </StContainer>
  );
}
export default Boatlist;

const StContainer = styled.div`
  width: 100%;
  height: 100vh;

  flex: 1; /* 나머지 공간을 가득 채우도록 함 */
`;
