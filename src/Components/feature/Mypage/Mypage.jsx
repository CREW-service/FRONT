import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import AuthApi from "shared/api";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { useRecoilState } from "recoil";
import { boatAtom } from "Recoil/recoilAtoms";
import writedboaticon from "./writedboaticon.png";
import defualtpic from "./defualtpic.jpg";
import Rectangle from "./Rectangle.png";

Modal.setAppElement("#root");

function Mypage() {
  const [myInfo, setMyInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [cookies] = useCookies(["authorization"]);
  const navigate = useNavigate();
  const [randerTriger, setRanderTriger] = useState(false);
  const [haveBoat, setHaveBoat] = useState(false);

  const [, setBoat] = useRecoilState(boatAtom);

  const config = {
    headers: {
      authorization: cookies.authorization,
    },
  };

  const getMyinfo = async () => {
    try {
      const { data } = await AuthApi.getMyInfo(config);
      setMyInfo(data);
      setIsLoading(false);
    } catch (err) {
      alert(err.response.data.errorMessage);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMyinfo();
  }, [randerTriger]);

  useEffect(() => {
    if (myInfo) {
      haveBoatHandler();
    }
  }, [myInfo]);

  const goingBoatHandler = (boatId) => {
    navigate(`/boat/${boatId}`);
  };

  const goingHomeHandler = () => {
    navigate("/");
  };

  const boatDeleteHandler = async (boatId) => {
    const toDay = new Date().toISOString().split("T")[0];
    const deletedAt = {
      deletedAt: toDay,
    };
    try {
      const res = await AuthApi.deleteBoat(boatId, deletedAt, config);
      alert(res.data.message);
      setRanderTriger(!randerTriger);
    } catch (err) {
      alert(err.response.data.errorMessage);
    }
  };

  const haveBoatHandler = () => {
    if (myInfo.attendedBoats.length !== 0 || myInfo.writedBoats.length !== 0) {
      setHaveBoat(true);
    } else {
      setHaveBoat(false);
    }
  };

  const fetchBoat = async (id) => {
    try {
      const { data } = await AuthApi.getBoatDetail(id, config);
      // console.log("data", data);
      setBoat(data);
      navigate("/CorrectionWriting")
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching post:", error);
      setIsLoading(false);
    }
  };

  const goingModiyBoat = async (boatId) => {
    fetchBoat(boatId);
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <StContainer>
          <StLayoutBox />
          <StPofileBox>
            <StPropic />
            <StNickNameBox>{myInfo.user.nickName}</StNickNameBox>
          </StPofileBox>
          <StSubTitleBox>나의 보트들</StSubTitleBox>
          {haveBoat ? (
            <>
              <StWritedBoatBox>
                <StWritedBoatTitle>
                  <img src={writedboaticon} alt="보트 아이콘" />
                  <span style={{ marginLeft: "8px" }}>내가 만든 보트</span>
                </StWritedBoatTitle>
                <StWritedBoatList>
                  {myInfo.writedBoats.map((boats) => (
                    <div key={boats.boatId}>
                      <StMyBoatTitle
                        onClick={() => goingBoatHandler(boats.boatId)}
                      >
                        {boats.title}
                      </StMyBoatTitle>
                      <StModiyButtonBox>
                        <StModiyButton
                          type="button"
                          onClick={() => goingModiyBoat(boats.boatId)}
                        >
                          수정
                        </StModiyButton>
                        <StDeleteButton
                          type="button"
                          onClick={() => setShowModal(true)}
                        >
                          삭제
                        </StDeleteButton>
                        {/* Modal */}
                        <Modal
                          isOpen={showModal}
                          onRequestClose={() => setShowModal(false)}
                          contentLabel="Confirmation Modal"
                          style={{
                            overlay: {
                              backgroundColor: "rgba(0, 0, 0, 0.5)",
                              zIndex: 1000,
                            },
                            content: {
                              width: "328px",
                              height: "334px",
                              margin: "auto",
                              padding: "20px",
                              borderRadius: "8px",
                              backgroundColor: "white",
                            },
                          }}
                        >
                          <StModalAlert>
                            <p>잠깐!</p>
                            <p>해당 글을 삭제할 경우 복구할 수 없습니다.</p>
                          </StModalAlert>
                          <StModalContent>
                            작성한 글을 삭제하시겠습니까?
                          </StModalContent>
                          <StModalButtonBox>
                            <StModalCancelButton
                              type="button"
                              onClick={() => setShowModal(false)}
                            >
                              취소
                            </StModalCancelButton>
                            <StModalDeleteButton
                              type="button"
                              onClick={() => boatDeleteHandler(boats.boatId)}
                            >
                              삭제
                            </StModalDeleteButton>
                          </StModalButtonBox>
                        </Modal>
                      </StModiyButtonBox>
                    </div>
                  ))}
                </StWritedBoatList>
              </StWritedBoatBox>
              <StAttendedList>
                {myInfo.attendedBoats.map((attended) => (
                  <div key={attended.boatId}>
                    <StAttendedTitle
                      onClick={() => goingBoatHandler(attended.boatId)}
                    >
                      {attended.title}
                    </StAttendedTitle>
                  </div>
                ))}
              </StAttendedList>
            </>
          ) : (
            <div>
              <StWritedBoatTitle>
                <img src={writedboaticon} alt="보트 아이콘" />
                <span style={{ marginLeft: "8px" }}>내가 만든 보트</span>
              </StWritedBoatTitle>
              <StNoShowingContent>
                <img src={Rectangle} alt="돋보기 이미지" />
                <StNoShowingContentsText>
                  현재 참여 중인 모임이 없어요.
                </StNoShowingContentsText>
                <StNoShowingContentsText>
                  새로운 모임을 찾으러 갈까요?
                </StNoShowingContentsText>
                <StNoShowingContentsButton
                  type="button"
                  onClick={goingHomeHandler}
                >
                  우리 동네 새로운 모임 찾기
                </StNoShowingContentsButton>
              </StNoShowingContent>
            </div>
          )}
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
  border-radius: 12px;
  background-image: url(${defualtpic});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: #d9d9d9;
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

const StWritedBoatBox = styled.div`
  /* Title/M */
  font-size: 18px;
  font-family: Pretendard;
  font-weight: 500;
  line-height: 24px;

  margin: 16px auto;

  padding: 28px auto 40px 20px;
  border-radius: 12px;
  border: 1px solid var(--primary-p-blue, #b1dcff);
  background: var(--gr-white, #fff);
`;

const StWritedBoatTitle = styled.div`
  color: var(--primary-blue, #30a2ff);
  margin: 28px 0 0 20px;
`;

const StWritedBoatList = styled.div`
  margin: 24px 16px 10px 16px;
`;

const StMyBoatTitle = styled.div`
  color: var(--gr-black, #222);

  /* Title/M */
  font-size: 18px;
  font-family: Pretendard;
  font-weight: 500;
  line-height: 24px;

  cursor: pointer;
`;

const StModiyButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StModiyButton = styled.button`
  margin: 0 16px 28px 10px;
  border: 0;
  background: var(--gr-white, #fff);

  color: var(--gr-deep, #3e4756);
  text-align: center;
  font-size: 14px;
  font-family: Pretendard;
  line-height: 20px;
  cursor: pointer;
`;

const StDeleteButton = styled.button`
  margin: 0 16px 28px 10px;
  border: 0;
  background: var(--gr-white, #fff);
  color: var(--red-red, #ea122b);
  text-align: center;
  font-size: 14px;
  font-family: Pretendard;
  font-weight: 700;
  line-height: 20px;
  cursor: pointer;
`;

const StAttendedList = styled.div`
  margin: 24px 16px 10px 16px;
`;

const StAttendedTitle = styled.div`
  color: var(--gr-black, #222);

  /* Title/M */
  font-size: 18px;
  font-family: Pretendard;
  font-weight: 500;
  line-height: 24px;
  margin-bottom: 24px;

  cursor: pointer;
`;

const StModalAlert = styled.div`
  margin: 40px 36px 16px 36px;
  color: var(--gr-black, #222);
  font-size: 24px;
  font-family: Pretendard;
  font-weight: 700;
  line-height: 34px;
`;

const StModalContent = styled.div`
  margin: 16px 36px 16px 36px;
  color: var(--gr-black, #222);

  /* Title/M */
  font-size: 18px;
  font-family: Pretendard;
  font-weight: 500;
  line-height: 24px;
`;

const StModalButtonBox = styled.div`
  margin: 16px 20px 40px 20px;
  display: flex;
  justify-content: space-between;
`;

const StModalCancelButton = styled.button`
  border: 0;
  background: var(--gr-white, #fff);

  width: 144px;
  height: 64px;
  padding: 16px 40px;

  color: var(--gr-deep, #3e4756);
  text-align: center;
  font-size: 22px;
  font-family: Pretendard;
  font-weight: 700;
  line-height: 24px;
  cursor: pointer;
`;

const StModalDeleteButton = styled.button`
  border: 0;
  background: var(--red-red, #ea122b);

  width: 144px;
  height: 64px;
  padding: 16px 40px;

  color: var(--gr-white, #fff);
  text-align: center;
  font-size: 22px;
  font-family: Pretendard;
  font-weight: 700;
  line-height: 24px;
  cursor: pointer;
`;

const StNoShowingContent = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StNoShowingContentsText = styled.p`
  color: var(--gr-deep, #3e4756);
  text-align: center;

  /* Body/M */
  font-size: 14px;
  font-family: Pretendard;
  font-weight: 500;
  line-height: 20px;
`;

const StNoShowingContentsButton = styled.button`
  margin-top: 30px;
  width: 320px;
  height: 68px;
  padding: 16px 40px;
  border: 0;
  border-radius: 35px;
  background: var(--primary-light-blue, #00c7ff);

  color: var(--gr-white, #fff);
  text-align: center;
  font-size: 18px;
  font-family: Pretendard;
  font-weight: 700;
  line-height: 24px;
`;
