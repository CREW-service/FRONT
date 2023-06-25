import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import AuthApi from "shared/api";
import styled from "styled-components";
import writedboaticon from "./writedboaticon.png"

function Mypage() {
  const [myInfo, setMyInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cookies] = useCookies(["authorization"]);

  const getMyinfo = async () => {
    try {
      const config = {
        headers: {
          authorization: cookies.authorization,
        },
      };
      const { data } = await AuthApi.getMyInfo(config);
      console.log(data);
      setMyInfo(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching post:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMyinfo();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <StContainer>
          <StLayoutBox />
          <StPofileBox>
            <StPropic>프로필 사진</StPropic>
            <StNickNameBox>닉네임, 현재 서버에서 데이터 못받음.</StNickNameBox>
          </StPofileBox>
          <StSubTitleBox>나의 보트들</StSubTitleBox>
          <StWritedBoatTitle>
            <img src={writedboaticon} alt="보트 아이콘" />
            <span style={{ marginLeft: '8px' }}>내가 만든 보트</span>
          </StWritedBoatTitle>
          <div>참여중인 보트</div>
        </StContainer>
      )}
    </div>
  );
}

export default Mypage;

const StContainer = styled.div``;

const StLayoutBox = styled.div`
  width: 360px;
  height: 84px;
  flex-shrink: 0;
  background: var(--gr-pale, #eff4f8);
`;

const StPofileBox = styled.div`
  margin-top: -44px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const StPropic = styled.div`
  width: 120px;
  height: 120px;
  flex-shrink: 0;
  border: solid 2px #000;
  border-radius: 12px;
  background: url(), lightgray -56.947px -90.325px / 302.659% 226.842% no-repeat,
    #d9d9d9;
`;

const StNickNameBox = styled.div`
  margin-top: 16px;
`;

const StSubTitleBox = styled.div`
  width: 360px;
  height: 64px;
  flex-shrink: 0;
  margin-top: 48px;

  display: flex;
  align-items: center;

  padding-left: 32px;

  color: var(--gr-black, #222);
  /* Title/L */
  font-size: 22px;
  font-family: Pretendard;
  font-weight: 500;
  line-height: 28px;

  border-bottom: 2px solid var(--gr-pale, #eff4f8);
  background: var(--gr-white, #fff);
`;

const StWritedBoatTitle = styled.div`
  color: var(--primary-blue, #30a2ff);

  /* Title/M */
  font-size: 18px;
  font-family: Pretendard;
  font-weight: 500;
  line-height: 24px;

  margin: 20px auto 30px 38px;
`;
