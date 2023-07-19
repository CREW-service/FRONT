import React from "react";
import styled from "styled-components";
import defualtpic from "imgs/defualtpic.jpg";

function Profile() {
  return (
    <div>
      <StProfileCorrectionBox>
        <StProfileImg src={defualtpic} alt="defualtpic" />
        <StimgCorrectionBtn />
      </StProfileCorrectionBox>
    </div>
  );
}
const StProfileCorrectionBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eff4f8;
  width: 100%;
  height: 240px;
`;
const StProfileImg = styled.img`
  display: block;
  width: 160px;
  height: 160px;
  border-radius: 12px;
  background-color: #fff;
  background-image: url(${defualtpic});
  box-shadow: 0px 1px 2px 2px rgba(0.85, 0.85, 0.85, 0.05);
`;

const StimgCorrectionBtn = styled.img``;
export default Profile;
