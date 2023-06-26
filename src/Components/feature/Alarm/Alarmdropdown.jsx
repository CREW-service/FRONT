import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import AuthApi from "shared/api";
import styled from "styled-components";
import Modal from "react-modal";
import Alerticon from "./Alerticon.png";
import Alerthaveicon from "./Alerthaveicon.png";

function Alarmdropdown() {
  const [alarms, setAlarms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cookies] = useCookies(["authorization"]);
  const [haveAlarms, setHaveAlarms] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const config = {
    headers: {
      authorization: cookies.authorization,
    },
  };
  console.log("dd");
  const getAlarms = async () => {
    try {
      const { data } = await AuthApi.getalarm(config);
      setAlarms(data.alarms);
      console.log(data);
      setIsLoading(false);
      console.log(data.alarms);
    } catch (err) {
      console.log("alarmerr", err);
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!cookies.authorization) return; // 쿠키에 authorization이 없으면 아무 동작도 하지 않음
    getAlarms();
  }, []);

  useEffect(() => {
    if (alarms.length > 0) {
      setHaveAlarms(true);
    } else {
      setHaveAlarms(false);
    }
  }, [alarms]);

  const modalHandler = () => {
    
    setShowModal(true);
  };

  const alarmReadHandler = async (alarmId) => {
    try {
      const res = await AuthApi.alarmRead(alarmId, config);
      getAlarms();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {isLoading ? (
        <StAlarmButton type="button">
          <StImg src={Alerticon} alt="알림 아이콘" />
        </StAlarmButton>
      ) : (
        <div>
          <StAlarmButton type="button" onClick={modalHandler}>
            <StImg
              src={haveAlarms ? Alerthaveicon : Alerticon}
              alt="알림 아이콘"
            />
          </StAlarmButton>
          <Modal
            isOpen={showModal}
            onRequestClose={() => setShowModal(false)}
            contentLabel="알림 목록"
            style={modalStyles} // 모달 스타일 적용
          >
            <div>
              {alarms.map((alarm) => (
                <StAlarmTextBox
                  key={alarm.alarmId}
                  isRead={alarm.isRead} // isRead 값을 전달
                >
                  <StAlarmText
                    type="button"
                    onClick={() => alarmReadHandler(alarm.alarmId)}
                  >
                    {alarm.message}
                  </StAlarmText>
                </StAlarmTextBox>
              ))}
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default Alarmdropdown;

const StAlarmButton = styled.button`
  padding: 0;
  background: #fff;
  border: 0;
  position: relative;

  width: 44px;
  height: 44px;
`;

const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0)",
    zIndex: 1000, // Added z-index property
  },
  content: {
    position: "absolute",
    top: "8%",
    left: "35%",
    // transform: "translate(-50%, -50%)",
    border: "none",
    borderRadius: "12px",
    boxShadow: "0px 8px 10px 0px rgba(0, 0, 0, 0.20)",
    background: "white",
    width: "210px",
    maxHeight: "280px",
    overflowY: "auto",
    padding: "16px",
  },
};

const StAlarmTextBox = styled.div`
  margin: 8px 0 4px 0;
  min-height: 34px;
  border-bottom: solid 1px #b1dcff;
  color: var(--gr-black, #222);
  text-overflow: ellipsis;
  /* white-space: nowrap; */

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  /* Body/M */
  font-size: 14px;
  font-family: Pretendard;
  font-weight: 500;
  line-height: 20px;
`;

const StAlarmText = styled.button`
  border: 0;
  background: rgba(255, 255, 255, 0); /* 투명한 백그라운드 컬러 */
`;

const StImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
