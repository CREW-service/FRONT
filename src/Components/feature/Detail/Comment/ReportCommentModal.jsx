import React, { useState } from "react";
import AuthApi from "shared/api";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { reportReasonAtom } from "Recoil/recoilAtoms";

function ReportCommentModal({ onClose, boatId, commentId }) {
  const [selectedReason, setSelectedReason] = useState(""); // 선택한 라디오 버튼 값 저장 상태
  const [reportReason] = useRecoilState(reportReasonAtom);

  // 라디오 버튼이 선택되었는지 확인하는 함수
  const isAnyRadioSelected = () => selectedReason !== "";

  const reportHandler = async () => {
    try {
      // 선택한 라디오 버튼의 값이 payload로 사용됨
      const payload = {
        reportContent: selectedReason,
      };
      const res = await AuthApi.reportComment(boatId, commentId, payload);
      alert(res.data.message);
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ModalBackground>
      <ModalContainer>
        <StHeader>
          <StH2>해당 댓글을 신고하시겠습니까?</StH2>
          <StCloseBtn type="button" onClick={onClose}>
            X
          </StCloseBtn>
        </StHeader>
        <StRadioContainer>
          {reportReason.map((reason) => (
            <div style={{ height: "56px" }} key={reason}>
              {/* 라디오 버튼에 checked 속성을 추가하여 선택 여부를 추적 */}
              <input
                type="radio"
                id={reason}
                name="reportReason"
                value={reason}
                checked={selectedReason === reason}
                onChange={() => setSelectedReason(reason)}
              />
              <StLabel htmlFor={reason}>{reason}</StLabel>
            </div>
          ))}
        </StRadioContainer>
        <StBtnContainer>
          <StCancelBtn type="button" onClick={onClose}>
            취소
          </StCancelBtn>
          <StReportBtn
            type="button"
            onClick={reportHandler}
            disabled={!isAnyRadioSelected()}
          >
            신고하기
          </StReportBtn>
        </StBtnContainer>
      </ModalContainer>
    </ModalBackground>
  );
}

ReportCommentModal.propTypes = {
  onClose: PropTypes.node.isRequired,
  boatId: PropTypes.node.isRequired,
  commentId: PropTypes.node.isRequired,
};

export default ReportCommentModal;

const ModalBackground = styled.div`
  position: fixed;
  top: -70px;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* 불투명한 배경을 만듭니다 */
  display: flex;
  justify-content: flex-end; /* 바텀 시트처럼 오른쪽 끝에서부터 모달이 올라오도록 설정 */
  align-items: flex-end; /* 바텀 시트처럼 아래쪽 끝에서부터 모달이 올라오도록 설정 */
  z-index: 9999; /* 다른 요소보다 위에 나타나도록 설정 */
`;

const ModalContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 360px;
  /* height: 368px; */
  background-color: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 16px;
  animation: slide-up 0.3s ease-out; /* 애니메이션 효과 추가 */

  @keyframes slide-up {
    from {
      transform: translateY(100%); /* 시작 위치 (모달이 아래로 숨겨져 있음) */
    }
    to {
      transform: translateY(
        0
      ); /* 종료 위치 (모달이 완전히 보이는 위치로 올라옴) */
    }
  }
`;

const StHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const StH2 = styled.h2`
  padding: 0px 10px;
  align-items: center;

  color: var(--gr-black, #222);

  /* Title/M */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 133.333% */
`;

const StCloseBtn = styled.button`
  border: 0;
  width: 24px;
  height: 24px;
  background-color: transparent;

  /* Title/M */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 133.333% */
`;

const StRadioContainer = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
`;

const StLabel = styled.label`
  padding: 8px 10px;
  color: var(--gr-black, #222);

  /* Body/L */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 150% */
`;

const StBtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StCancelBtn = styled.button`
  width: 120px;
  height: 56px;

  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border: 0;
  background: #fff;
  color: var(--primary-blue, #30a2ff);
  text-align: center;

  /* Title/M */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 133.333% */
`;

const StReportBtn = styled.button`
  width: 120px;
  height: 56px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border: 0;
  background: #fff;
  color: ${(props) => (props.disabled ? "gray" : "var(--red-red, #ea122b)")};
  text-align: center;

  /* Title/M */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 133.333% */

`;
