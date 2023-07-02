import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import AuthApi from "shared/api";
import styled from "styled-components";
import Alerticon from "imgs/alret_ic_1.png";
import Alerthaveicon from "imgs/alret_ic_2.png";

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
  const getAlarms = async () => {
    try {
      const { data } = await AuthApi.getalarm(config);
      setAlarms(data.alarms);
      // console.log(data);
      setIsLoading(false);
      // console.log(data.alarms);
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
    setShowModal(!showModal);
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
            {showModal && (
            <StModalOverlay>
              <StModalContainer>
                {alarms.map((alarm) => (
                  <StAlarmTextBox
                    key={alarm.alarmId}
                    isRead={alarm.isRead}
                  >
                    <StAlarmText
                      type="button"
                      onClick={() => alarmReadHandler(alarm.alarmId)}
                    >
                      {alarm.message}
                    </StAlarmText>
                  </StAlarmTextBox>
                ))}
              </StModalContainer>
            </StModalOverlay>
          )}
          </StAlarmButton>
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

const StModalOverlay = styled.div`
  position: absolute;
  top: 115%;
  /* left: 100%; */
  right: -75%;
  /* bottom: 0; */
  background-color: rgba(255, 255, 255, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 228px;
  z-index: 1000;
`;

const StModalContainer = styled.div`
  border-radius: 10px;
  width: 210px;
  max-height: 280px;
  overflow-y: auto;
  padding: 16px;
  background: #FFF;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.2);
`;

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
