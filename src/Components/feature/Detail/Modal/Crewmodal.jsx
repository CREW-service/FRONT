import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import AuthApi from "shared/api";
import CrewReportModal from "./CrewReportModal"

function Crewmodal({ boat, setModalOpen, boatId, renderTriggerHandler }) {
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const closeModal = () => {
    setModalOpen(false);
  };

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  useEffect(() => {
    const handler = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };
    // 빈화면 클릭 모달 off
    document.addEventListener("mousedown", handler);
    // document.addEventListener('touchstart', handler); // 모바일 대응
  }, [setModalOpen]);

  const [cookies] = useCookies(["authorization"]);

  const exitModalHandler = async () => {
    try {
      const config = {
        headers: {
          authorization: cookies.authorization,
        },
      };
      const res = await AuthApi.exitBoat(boatId, config);
      alert(res.data.message);
      navigate("/main");
    } catch (err) {
      console.log(err);
    }
  };

  const openReportSheet = () => {
    setIsReportModalOpen(true); // 모달을 표시하기 위해 상태 변수를 true로 설정
  };

  // const reportHandler = async (payload) => {
  //   try {
  //     const res = await AuthApi.exitBoat(boatId, payload);
  //     alert(res.data.message);
  //     navigate("/main");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  return (
    <StContainer ref={modalRef}>
      <ExitBtn onClick={exitModalHandler}>나가기</ExitBtn>
      <ReportBtn onClick={openReportSheet}>신고하고 나가기</ReportBtn>
      {/* isReportModalOpen이 true일 때만 ReportModal 컴포넌트를 렌더링합니다 */}
      {isReportModalOpen && (
        <CrewReportModal
          onClose={() => setIsReportModalOpen(false)}
          boatId={boatId}
          cookies={cookies}
          navigate={navigate}
          exitModalHandler = {exitModalHandler}
        />
      )}
    </StContainer>
  );
}

export default Crewmodal;

Crewmodal.propTypes = {
  boat: PropTypes.node.isRequired,
  setModalOpen: PropTypes.node.isRequired,
  boatId: PropTypes.node.isRequired,
  renderTriggerHandler: PropTypes.node.isRequired,
};

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ExitBtn = styled.button`
  width: 132px;
  height: 36px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border: none;
  border-radius: 35px;
  background: var(--primary-blue, #30a2ff);

  color: var(--gr-white, #fff);
  text-align: center;
  font-size: 14px;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
`;

const ReportBtn = styled.button`
  width: 132px;
  height: 36px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-radius: 35px;
  border: none;
  background-color: #fff;

  color: var(--red-red, #ea122b);
  text-align: center;
  font-size: 14px;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
`;
