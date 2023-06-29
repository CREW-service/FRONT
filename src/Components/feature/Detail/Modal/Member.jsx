import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useCookies } from "react-cookie";
import { personTypeAtom } from "Recoil/recoilAtoms";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import AuthApi from "shared/api";

function Member({ boat, boatId }) {
  const [cookies] = useCookies(["authorization"]);
  const config = {
    headers: {
      // 쿠키를 헤더에 추가
      authorization: cookies.authorization,
    },
  };
  const [personType, setPersonType] = useRecoilState(personTypeAtom);

  const dropBoatHandler = async (id) => {
    const removeUser = {
      id,
    };

    try {
      const dropBoat = await AuthApi.releaseCrew(boatId, removeUser, config);
      {
        console.log("dropBoat", dropBoat);
      }
    } catch (err) {
      console.log("droperr", err);
      alert("내보내기 완료");
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
};

const StContainer = styled.div`
  display: flex;
`;

const CrewMemberBox = styled.div`
  width: 90px;
  height: 40px;
  display: flex;
  flex-direction: column;
`;

const Box = styled.div`
  width: 180px;
  height: 40px;
  display: flex;
`;

const ReleaseBtn = styled.button`
  width: 80px;
  height: 40px;
  margin-left: 46px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 16px;
  border-radius: 12px;
  border: none;
  background-color: #fff;
`;
