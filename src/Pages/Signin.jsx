import Layout from "Components/Layout/Layout";
import Kakaologin from "Components/feature/Kakaologin/Kakaologin";
import React from "react";
import styled from "styled-components";

function Signin() {
  return (
    <Layout>
      <StContainer>
        <Kakaologin />
      </StContainer>
    </Layout>
  );
}

export default Signin;

const StContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%; /* 부모 요소의 높이를 100%로 설정 */
`;
