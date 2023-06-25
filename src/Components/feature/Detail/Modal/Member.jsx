import React from "react";
import PropTypes from "prop-types";
import { personTypeAtom } from "Recoil/recoilAtoms";
import { useRecoilState } from "recoil";

function Member({ boat }) {
  console.log("ModalBoat", boat);
  const [personType, setPersonType] = useRecoilState(personTypeAtom);

  return (
    <div>
      {personType === "captain" ? (
        <div>
          {boat.crew.map((crewMember) => (
            <div key={crewMember.id}>
              {crewMember.nickName}
              <span>내보내기</span>
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
};
