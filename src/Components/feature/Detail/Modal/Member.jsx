import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useCookies } from "react-cookie";
import { personTypeAtom } from "Recoil/recoilAtoms";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import AuthApi from "shared/api";

function Member({ boat, boatId, renderTriggerHandler }) {
  const [cookies] = useCookies(["authorization"]);
  const config = {
    headers: {
      // 쿠키를 헤더에 추가
      authorization: cookies.authorization,
    },
  };
  const [personType] = useRecoilState(personTypeAtom);
  const dropBoatHandler = async (id) => {
    const removeUser = {
      id,
    };
    try {
      const dropBoat = await AuthApi.releaseCrew(boatId, removeUser, config);
      renderTriggerHandler();
    } catch (err) {
      console.log("droperr", err);
    }
  };

  return (
    <StContainer>
      {personType === "captain" ? (
        <CrewMemberBox>
          {boat.crew.map((crewMember) => (
            <Box key={crewMember.userId}>
              {crewMember.nickName}
              <ReleaseBtn onClick={() => dropBoatHandler(crewMember.userId)}>
                내보내기
              </ReleaseBtn>
            </Box>
          ))}
        </CrewMemberBox>
      ) : (
        <CrewMemberBox>
          {boat.crew.map((crewMember) => (
            <Box key={crewMember.id}>{crewMember.nickName}</Box>
          ))}
        </CrewMemberBox>
      )}
    </StContainer>
  );
}

export default Member;
Member.propTypes = {
  boat: PropTypes.node.isRequired,
  boatId: PropTypes.node.isRequired,
  renderTriggerHandler: PropTypes.node.isRequired,
};

const StContainer = styled.div`
  display: flex;
  position: relative;
`;

const CrewMemberBox = styled.div`
  width: 180px;
  display: flex;
  flex-direction: column;

  position: absolute;
  background-color: #fff;

  z-index: 9999;
  /* transform: translate(100%, -4%); */
  top: 100%;
  right: 0;
  gap: 5px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 15px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 5px;
  padding: 24px;
`;

const Box = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const ReleaseBtn = styled.button`
  width: 80px;
  flex-grow: 0;
  gap: 10px;
  border-radius: 12px;
  border: none;
  background-color: #fff;

  background: var(--gr-white, #fff);

  color: var(--primary-light-blue, #00c7ff);
  text-align: center;
  font-size: 14px;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
`;
