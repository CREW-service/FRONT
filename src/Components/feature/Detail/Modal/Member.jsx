import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useCookies } from "react-cookie";
import { personTypeAtom } from "Recoil/recoilAtoms";
import { useRecoilState } from "recoil";
import AuthApi from "shared/api";

function Member({ boat, boatId }) {
  console.log(boatId);
  const [cookies] = useCookies(["authorization"]);
  const config = {
    headers: {
      // 쿠키를 헤더에 추가
      authorization: cookies.authorization,
    },
  };
  console.log("ModalBoat", boat);
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
    <div>
      {personType === "captain" ? (
        <div>
          {boat.crew.map((crewMember) => (
            <div key={crewMember.userId}>
              {crewMember.nickName}
              <button
                type="button"
                onClick={() => dropBoatHandler(crewMember.userId)}
              >
                내보내기
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {boat.crew.map((crewMember) => (
            <div key={crewMember.id}>{crewMember.nickName}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Member;
Member.propTypes = {
  boat: PropTypes.node.isRequired,
  boatId: PropTypes.node.isRequired,
};
