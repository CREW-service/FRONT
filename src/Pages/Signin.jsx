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
  justify-content: center;
  align-items: center;
`;
