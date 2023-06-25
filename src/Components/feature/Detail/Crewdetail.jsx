import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import DOMPurify from "dompurify"; // DOMPurify 라이브러리 가져오기
import Comment from "./Comment/Comment";
import Member from "./Modal/Member";

function Crewdetail({ boat, boatId, renderTriggerHandler }) {
  const [memberShowModal, setMemberShowModal] = useState(false);
  const memberModalHandler = () => {
    setMemberShowModal(!memberShowModal);
  };
  return (
    <div>
      <div>
        <div>
          <div>제목 : {boat.boat.title}</div>
          <div>
            작성일 : {new Date(boat.boat.createdAt).toISOString().split("T")[0]}
            <br />
            작성자 : {boat.boat.captain}
          </div>
          <div>지역: {boat.boat.address}</div>
          <div>모집 기한: {boat.boat.endDate}</div>
          <div>
            모집 인원:
            <StMemberBox onClick={memberModalHandler}>
              {boat.boat.crewNum}/{boat.boat.maxCrewNum}
            </StMemberBox>
            {memberShowModal && (
              <Member
                boat={boat}
                setMemberShowModal={setMemberShowModal}
                renderTriggerHandler={renderTriggerHandler}
              />
            )}
          </div>
          <div>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(boat.boat.content),
              }}
            />
          </div>
        </div>

        <Comment
          boat={boat}
          boatId={boatId}
          renderTriggerHandler={renderTriggerHandler}
        />
      </div>
    </div>
  );
}

export default Crewdetail;

Crewdetail.propTypes = {
  boat: PropTypes.node.isRequired,
  boatId: PropTypes.node.isRequired,
  renderTriggerHandler: PropTypes.node.isRequired,
};

const StMemberBox = styled.span`
  z-index: 9999;
`;
