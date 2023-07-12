import React from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import PropTypes from "prop-types";
import DOMPurify from "dompurify"; // DOMPurify 라이브러리 가져오기
import AuthApi from "shared/api";

function Otherpeople({ boat, renderTriggerHandler }) {
  const { id } = useParams();
  const [cookies] = useCookies(["authorization"]);
  const config = {
    headers: {
      // 쿠키를 헤더에 추가
      authorization: cookies.authorization,
    },
  };

  const joinBoatHandler = async () => {
    try {
      const res = await AuthApi.joinBoat(id, config);
      alert(res.data.message);
      renderTriggerHandler();
    } catch (err) {
      // console.log("Error:", error);
      alert(err.response.data.errorMessage);
    }
  };

  return (
    <StContainer>
      <Title>{boat.boat.title}</Title>
      <CreatedAt>
        <Captain>{boat.boat.captain}</Captain>
        {new Date(boat.boat.createdAt).toISOString().split("T")[0]}
      </CreatedAt>
      <Box>
        <Address>
          <span>지역</span>
          <span>{boat.boat.address}</span>
        </Address>
        <MaxCrewNum>
          <span>모집 인원</span>
          <span>
            {boat.boat.crewNum}/{boat.boat.maxCrewNum}
          </span>
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
      <JoinBtn
        type="button"
        onClick={() => {
          joinBoatHandler();
        }}
      >
        참여하기
      </JoinBtn>
    </StContainer>
  );
}

export default Otherpeople;

Otherpeople.propTypes = {
  boat: PropTypes.node.isRequired,
  renderTriggerHandler: PropTypes.node.isRequired,
};

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  min-height: calc(100vh - 128px);
  box-sizing: border-box;
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
`;

const CreatedAt = styled.span`
  /* width: 55px;
  height: 20px; */
  margin: 10px 0 0 8px;
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
  margin: 10px 8px 0 0;
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
  flex: 1;
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

const JoinBtn = styled.button`
  width: 320px;
  height: 56px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 5px auto;
  padding: 16px 40px;
  border-radius: 35px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.25);
  background-color: #30a2ff;
  border: none;

  font-style: normal;
  flex-grow: 0;
  font-family: Pretendard;
  font-size: 22px;
  font-weight: 500;
  color: #fff;
`;
