import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import DOMPurify from "dompurify"; // DOMPurify 라이브러리 가져오기
import Captainmodal from "./Modal/Captainmodal";
import Comment from "./Comment/Comment";
import Member from "./Modal/Member";
import viewBtn from "./view_cap.png";
import crewListBtn from "./view_crew_list.png";

function Captaindetail({ boat, boatId, renderTriggerHandler }) {
  // 모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);

  const [memberShowModal, setMemberShowModal] = useState(false);
  const memberModalHandler = () => {
    setMemberShowModal(!memberShowModal);
  };

  // 모달창 노출
  const showModal = () => {
    setModalOpen(true);
  };

  return (
    <div>
      <StContainer>
        <Title>{boat.boat.title}</Title>
        <CreatedAt>
          <Captain>{boat.boat.captain}</Captain>
          {new Date(boat.boat.createdAt).toISOString().split("T")[0]}
          <StImg src={viewBtn} alt="captainDetail button" onClick={showModal} />
          {modalOpen && (
            <Captainmodal
              boat={boat}
              boatId={boatId}
              setModalOpen={setModalOpen}
              style={captainModalStyles}
            />
          )}
        </CreatedAt>
        <Box>
          <Address>
            <span>지역</span>
            <span>{boat.boat.address}</span>
          </Address>
          <MaxCrewNum>
            <span>모집 인원</span>
            <StMemberBox
              src={crewListBtn}
              alt="crewList button"
              onClick={memberModalHandler}
            />
            {memberShowModal && (
              <Member
                boatId={boatId}
                boat={boat}
                setMemberShowModal={setMemberShowModal}
              />
            )}
            {boat.boat.crewNum}/{boat.boat.maxCrewNum}
          </MaxCrewNum>
          <EndDate>
            <span>모집 기한</span>
            <span>{boat.endDate ? boat.endDate : "상시 모집"}</span>
          </EndDate>
        </Box>
        <Content
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(boat.boat.content),
          }}
        />
      </StContainer>
      <Comment
        boat={boat}
        boatId={boatId}
        renderTriggerHandler={renderTriggerHandler}
      />
    </div>
  );
}

export default Captaindetail;

Captaindetail.propTypes = {
  boat: PropTypes.node.isRequired,
  boatId: PropTypes.node.isRequired,
  renderTriggerHandler: PropTypes.node.isRequired,
};

const StMemberBox = styled.img`
  max-width: 100px;
  max-height: 150px;
`;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Title = styled.div`
  margin: 32px 16px;
  font-family: Pretendard;
  font-size: 24px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  color: #222;
`;

const CreatedAt = styled.span`
  /* width: 55px;
  height: 20px; */
  margin: 10px 8px 0 8px;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #222;
`;

const Captain = styled.span`
  /* width: 37px;
  height: 20px; */
  margin: 10px 8px;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #222;
`;

const Box = styled.div`
  /* width: 328px; */
  min-height: 144px;
  margin: 23px 0 20px;
  background-color: #fff;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const Address = styled.div`
  /* height: 24px; */
  display: flex;
  justify-content: space-between;
  margin: 24px 0 12px;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  color: #222;
`;

const MaxCrewNum = styled.div`
  /* height: 24px; */
  margin: 12px 0;
  display: flex;
  justify-content: space-between;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  color: #222;
`;

const EndDate = styled.div`
  /* height: 24px; */
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  color: #222;
`;

const Content = styled.div`
  width: 100%;
  margin: 20px 0 5px;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: left;
  color: #222;
`;

const StImg = styled.img`
  width: 25px;
  height: 25px;
  margin-left: 186px;
`;

const captainModalStyles = {};
