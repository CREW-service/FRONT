import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import DOMPurify from "dompurify"; // DOMPurify 라이브러리 가져오기
import crewListBtn from "imgs/view_crew_list.png";
import viewBtn from "imgs/view_cap.png";
import Captainmodal from "./Modal/Captainmodal";
import Comment from "./Comment/Comment";
import Member from "./Modal/Member";

function Captaindetail({ boat, boatId, renderTriggerHandler }) {
  // 모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);

  const [memberShowModal, setMemberShowModal] = useState(false);
  const memberModalHandler = () => {
    if (boat.crew.length > 0) {
      setMemberShowModal(!memberShowModal);
    }
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
          <div>
            <Captain>{boat.boat.captain}</Captain>
            {new Date(boat.boat.createdAt).toISOString().split("T")[0]}
          </div>
          <div style={{ position: "relative" }}>
            <StImg
              src={viewBtn}
              alt="captainDetail button"
              onClick={showModal}
            />
            {modalOpen && (
              <StModalBox>
                <Captainmodal
                  boat={boat}
                  boatId={boatId}
                  setModalOpen={setModalOpen}
                />
              </StModalBox>
            )}
          </div>
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
                renderTriggerHandler={renderTriggerHandler}
              />
            )}
            <CrewNum>
              {boat.boat.crewNum}/{boat.boat.maxCrewNum}
            </CrewNum>
          </MaxCrewNum>
          <EndDate>
            <span>모집 기한</span>
            <span>{boat.boat.endDate ? boat.boat.endDate : "상시 모집"}</span>
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
  width: 8%;
  margin-left: auto;
`;

const CrewNum = styled.span`
  margin-left: 10px;
`;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Title = styled.div`
  margin: 32px 0 16px 0;
  font-family: Pretendard;
  font-size: 24px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  color: #222;
  width: 328px;
  height: 50px;
`;

const CreatedAt = styled.span`
  display: flex;
  margin: 10px 0 0 8px;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #222;

  display: flex;
  justify-content: space-between;
`;

const Captain = styled.span`
  margin: 10px 8px 0 0;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #222;
  margin-left: 3px;
  margin-right: 16px;
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
`;

const StModalBox = styled.div`
  display: flex;
  flex-direction: column;

  position: absolute;
  background-color: #fff;

  z-index: 9999;
  top: 100%;
  right: 0;
  margin-top: 5px;
  gap: 5px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 15px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;
