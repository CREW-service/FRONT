import React, { useEffect, useState, useRef } from "react";
import { useCookies } from "react-cookie";
import AuthApi from "shared/api";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { useRecoilState } from "recoil";
import { boatAtom } from "Recoil/recoilAtoms";
import writedboaticon from "imgs/writedboaticon.svg";
import writedboaticonBlue from "imgs/writedboaticon.png";
import defualtpic from "imgs/defualtpic.jpg";
import Rectangle from "imgs/Rectangle.png";
import SETTING from "imgs/Vector.png";
import LOADING from "imgs/loading.gif";

Modal.setAppElement("#root");

function Mypage() {
  const [myInfo, setMyInfo] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [cookies] = useCookies(["authorization"]);
  const navigate = useNavigate();
  const [randerTriger, setRanderTriger] = useState(false);
  const [haveBoat, setHaveBoat] = useState(false);
  const [selectId, setSelectId] = useState(null);
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
      navigate("/main");
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
    navigate("/main");
  };

  const modalButtonHandler = (boatId) => {
    setSelectId(boatId);
    setShowModal(true);
  };

  const ProfileHandler = () => {
    navigate("/profile", { state: myInfo });
  };
  console.log("myinfo", myInfo);

  const boatDeleteHandler = async (boatId) => {
    const toDay = new Date().toISOString().split("T")[0];
    const deletedAt = {
      deletedAt: toDay,
    };
    try {
      const res = await AuthApi.deleteBoat(boatId, deletedAt, config);
      alert(res.data.message);
      setShowModal(!showModal);
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
      navigate("/CorrectionWriting");
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
        <div>
          <img src={LOADING} alt="Loading..." />
        </div>
      ) : (
        <StContainer>
          <StProfileBox>
            <StPropic src={myInfo?.user.profileImage} alt="" />

            <StMessageBox>
              <StNickNameBox>{myInfo?.user.nickName}</StNickNameBox>
              <StMyMessage>{myInfo?.user.myMessage}</StMyMessage>
              <StProfileSetting onClick={ProfileHandler}>
                <StSettingImg src={SETTING} alt="SETTING" />
              </StProfileSetting>
            </StMessageBox>
          </StProfileBox>
          <StSubTitleBox>
            <StMyBoatsListBox>나의 보트들</StMyBoatsListBox>
            <StChatBox>채팅</StChatBox>
          </StSubTitleBox>
          {haveBoat ? (
            <>
              <StWritedBoatBox>
                <StWritedBoatTitle>
                  <StMyWriteBoats>내가 만든 보트</StMyWriteBoats>
                  <StBoatIcon src={writedboaticon} alt="보트 아이콘" />
                </StWritedBoatTitle>
                <StWritedBoatList>
                  {myInfo?.writedBoats.map((boats) => (
                    <StMapBoatList key={boats.boatId}>
                      {/* <StBoatListBar></StBoatListBar> */}
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
                          onClick={() => modalButtonHandler(boats.boatId)}
                        >
                          삭제
                        </StDeleteButton>
                      </StModiyButtonBox>
                    </StMapBoatList>
                  ))}
                </StWritedBoatList>
              </StWritedBoatBox>
              <StAttendedList>
                <StWritedBoatTitle>
                  <StInBoats>참여 중인 보트</StInBoats>
                  <StBoatIcon src={writedboaticonBlue} alt="보트 아이콘" />
                </StWritedBoatTitle>
                {myInfo.attendedBoats.map((attended) => (
                  <StMapInboats key={attended.boatId}>
                    <StAttendedTitle
                      onClick={() => goingBoatHandler(attended.boatId)}
                    >
                      {attended.title}
                    </StAttendedTitle>
                  </StMapInboats>
                ))}
              </StAttendedList>
            </>
          ) : (
            <div>
              <StNoShowingContent>
                <img src={Rectangle} alt="위치마커이미지" />
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
          {/* Modal */}
          <Modal
            isOpen={showModal}
            onRequestClose={() => setShowModal(false)}
            contentLabel="Confirmation Modal"
            style={modalstyles}
          >
            <StModalAlert>
              <p>잠깐!</p>
              <p>
                해당 글을 삭제할 경우
                <br /> 복구할 수 없습니다.
              </p>
            </StModalAlert>
            <StModalContent>작성한 글을 삭제하시겠습니까?</StModalContent>
            <StModalButtonBox>
              <StModalCancelButton
                type="button"
                onClick={() => setShowModal(false)}
              >
                취소
              </StModalCancelButton>
              <StModalDeleteButton
                type="button"
                onClick={() => boatDeleteHandler(selectId)}
              >
                삭제
              </StModalDeleteButton>
            </StModalButtonBox>
          </Modal>
        </StContainer>
      )}
    </div>
  );
}

export default Mypage;

const StContainer = styled.div``;

const StProfileBox = styled.div`
  display: flex;
  padding: 32px 16px;
`;

const StPropic = styled.img`
  display: block;
  width: 80px;
  height: 80px;
  margin-right: 20px;

  flex-shrink: 0;
  border-radius: 12px;
  background-image: url(${defualtpic});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: #d9d9d9;
  box-shadow: 0px 0px 8px 1px rgba(217, 217, 217, 1);
`;
const StMessageBox = styled.div`
  position: relative;
  width: 100%;
`;
const StNickNameBox = styled.div`
  font-size: 16px;
  font-family: Pretendard;
  font-weight: 500;
  color: #222;
  margin-bottom: 16px;
`;

const StMyMessage = styled.p`
  font-size: 14px;
  font-family: Pretendard;
  color: #222;
`;
const StProfileSetting = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  top: 0;
  right: 0;
`;
const StSettingImg = styled.img``;
const StSubTitleBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 64px;
  flex-shrink: 0;

  color: #222;
  font-size: 22px;
  font-family: Pretendard;
  font-weight: 500;
  border-top: 2px solid #eff4f8;
  background: #fff;
`;
const StMyBoatsListBox = styled.div`
  width: 100%;
  color: #30a2ff;

  text-align: center;
  font-size: 18px;
  padding: 16px 32px;
`;

const StChatBox = styled.div`
  width: 100%;

  text-align: center;
  font-size: 18px;
  padding: 16px 32px;
`;

const StWritedBoatBox = styled.div`
  padding: 24px 28px 10px;
  font-family: Pretendard;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background: #b1dcff;

  box-shadow: -1px 12px 8px -6px rgba(211, 211, 211, 0.67);
`;

const StWritedBoatTitle = styled.div`
  display: flex;
  color: #222;
  font-size: 24px;
  font-weight: 500;
  height: 40px;
  align-items: center;
  margin-bottom: 8px;
`;

const StInBoats = styled.div`
  color: #00c7ff;
  margin-right: 8px;

  text-align: center;
`;

const StMyWriteBoats = styled.span`
  text-align: center;
`;

const StBoatIcon = styled.img`
  display: block;
`;

const StWritedBoatList = styled.div``;
const StMapBoatList = styled.div`
  margin: 12px 0 24px;
  border-top: 1px solid #fff;
`;

const StMyBoatTitle = styled.div`
  color: #222;
  font-size: 18px;
  font-family: Pretendard;
  font-weight: 500;
  width: 100%;
  height: 48px;
  margin-top: 20px;
  cursor: pointer;
`;

const StModiyButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StModiyButton = styled.button`
  border: none;
  background: #fff;
  padding: 8px 16px;
  margin-right: 10px;
  border-radius: 35px;
  color: #3e4756;
  text-align: center;
  font-size: 14px;
  font-family: Pretendard;
  cursor: pointer;
`;

const StDeleteButton = styled.button`
  border: none;
  background: #fff;
  padding: 8px 16px;
  border-radius: 35px;
  background: #fff;
  color: #ea122b;
  text-align: center;
  font-size: 14px;
  font-family: Pretendard;
  font-weight: 700;
  cursor: pointer;
`;

const StAttendedList = styled.div`
  margin: 24px 16px;
  padding: 28px 18px;
  border: 1px solid #f5f5f5;
  border-radius: 12px;
  background-color: #fff;
`;
const StMapInboats = styled.div`
  padding: 16px 0;
  border-top: 1px solid #eff4f8;
`;

const StAttendedTitle = styled.div`
  color: #222;
  font-size: 18px;
  font-family: Pretendard;
  font-weight: 500;
  cursor: pointer;
`;

const StModalAlert = styled.div`
  color: #222;
  font-size: 24px;
  font-family: Pretendard;
  font-weight: 700;
  line-height: 34px;
  margin: 20px 16px 32px;
`;

const StModalContent = styled.div`
  color: #222;
  margin: 0 15px 48px;
  font-size: 18px;
  font-family: Pretendard;
  font-weight: 500;
`;

const StModalButtonBox = styled.div`
  display: flex;
  align-items: center;
`;

const StModalCancelButton = styled.button`
  border: none;
  border-radius: 35px;
  background: #fff;
  width: 100%;
  padding: 16px 40px;
  height: 56px;
  color: #3e4756;
  text-align: center;
  font-size: 20px;
  font-family: Pretendard;
  font-weight: 700;
  cursor: pointer;
`;

const StModalDeleteButton = styled.button`
  border: none;
  border-radius: 35px;
  background: #ea122b;
  width: 100%;
  padding: 16px 40px;
  height: 56px;
  color: #fff;
  text-align: center;
  font-size: 20px;
  font-family: Pretendard;
  font-weight: 700;
  cursor: pointer;
`;

const StNoShowingContent = styled.div`
  padding-top: 103px;
  display: flex;
  height: 390px;
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
  box-sizing: border-box;
  margin-top: 105px;
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

const modalstyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    zIndex: 1000,
  },
  content: {
    width: "334px",
    height: "325px",
    margin: "auto",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#fff",
  },
};
