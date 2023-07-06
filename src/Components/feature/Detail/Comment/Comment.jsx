import React, { useState, useEffect, useRef } from "react";
import { currentUserIdAtom } from "Recoil/recoilAtoms";
import { useRecoilState } from "recoil";
import { useCookies } from "react-cookie";
import AuthApi from "shared/api";
import PropTypes from "prop-types";
import { styled } from "styled-components";
import MORE_IC from "imgs/more_ic.png";
// import Commentmodal from "../Modal/Commentmodal";

function Comment({ boat, boatId, renderTriggerHandler }) {
  const [currentUserId, setCurrentUserId] = useRecoilState(currentUserIdAtom);
  const [comments, setComments] = useState([]);
  const [selectedComment, setSeletedComment] = useState(null);
  const [cookies] = useCookies(["authorization"]);
  const [isCommentsEmpty, setIsCommentsEmpty] = useState(true);

  const [modiyValue, setModiyValue] = useState("");
  const [isModiy, setIsModiy] = useState(null);
  const modalRef = useRef(null);

  const config = {
    headers: {
      // 쿠키를 헤더에 추가
      authorization: cookies.authorization,
    },
  };

  const getUserInfo = async () => {
    try {
      const res = await AuthApi.getCurrentUser(config);
      setCurrentUserId(res.data.userId);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [isModiy]);

  const commentChangeHandler = (event) => {
    setComments(event.target.value);
    setIsCommentsEmpty(event.target.value.trim() === "");
  };

  const modiyHandler = (event) => {
    setModiyValue(event.target.value);
  };

  const commentInputHandler = async (e) => {
    e.preventDefault();
    if (comments.length === 0) {
      alert("글을 입력해주세요");
      return;
    }
    try {
      const newComment = {
        id: comments.length + 1,
        comment: comments,
      };
      const res = await AuthApi.comment(boatId, newComment, config);
      alert(res.data.message);
      setComments("");
      renderTriggerHandler();
    } catch (err) {
      alert(err.response.data.errorMessage);
    }
  };

  // 댓글 수정 버튼
  const editCommentHandler = (comment) => {
    setModiyValue(comment.comment);
    setSeletedComment(null);
    setIsModiy(comment.commentId);
    // setCorrectionComment(comment);
  };

  // 완료버튼 클릭시 저장
  const saveEditedCommentHandler = async (commentId) => {
    try {
      const updatedComment = {
        comment: modiyValue,
      };
      renderTriggerHandler();

      const res = await AuthApi.correctionComment(
        boatId,
        commentId,
        updatedComment,
        config
      );

      alert(res.data.message);
      renderTriggerHandler();
      setIsModiy(null);
    } catch (err) {
      console.log(err);
    }
  };

  // 댓글 삭제 버튼
  const deleteCommentHandler = async (commentId) => {
    try {
      const deletedAt = new Date();
      const newDeleteData = {
        deletedAt,
      };

      const res = await AuthApi.deleteComment(
        boatId,
        commentId,
        newDeleteData,
        config
      );

      alert(res.data.message);
      renderTriggerHandler();
    } catch (err) {
      console.log(err);
    }
  };

  // 수정 모달 취소 버튼
  const cancelEditCommentHandler = () => {
    setModiyValue(""); // 수정 중인 값을 초기화
    setIsModiy(null); // 수정 상태를 해제
  };

  return (
    <StContainer>
      <StLine>{/* 라인을 위한 div */}</StLine>
      <StInputField>
        <StInputBox
          type="text"
          placeholder="댓글을 남겨보세요"
          value={comments}
          onChange={commentChangeHandler}
        />
        <StInputBtn
          type="button"
          onClick={commentInputHandler}
          className={isCommentsEmpty ? "empty" : ""}
        >
          저장
        </StInputBtn>
      </StInputField>
      {boat.comments.map((comment) => (
        <StCommnetContainer key={comment.commentId}>
          {currentUserId === comment.userId ? (
            <StCommnetListField>
              <StCommentUserNic>
                <StNickName>{comment.nickName}</StNickName>
                <StCommentBox>{comment.commnet}</StCommentBox>
                <div style={{ position: "relative" }}>
                  <StCommnetModalOpenBtn
                    type="button"
                    onClick={() => setSeletedComment(comment.commentId)}
                  >
                    <StMoreIcImg src={MORE_IC} alt="더 보기" />
                  </StCommnetModalOpenBtn>
                  {selectedComment === comment.commentId && (
                    <StModalContainer id={comment.commentId} ref={modalRef}>
                      <StCorrectionBtn
                        type="button"
                        onClick={() => editCommentHandler(comment)}
                      >
                        수정
                      </StCorrectionBtn>
                      <StDeleteBtn
                        type="button"
                        onClick={() => deleteCommentHandler(comment.commentId)}
                      >
                        삭제
                      </StDeleteBtn>
                    </StModalContainer>
                  )}
                </div>
              </StCommentUserNic>
              {isModiy === comment.commentId ? (
                <StCorrectionInputField>
                  <StCorrectionInput
                    value={modiyValue}
                    onChange={modiyHandler}
                  />
                  <StCorrctionBtnBox>
                    <StCancelBtn
                      type="button"
                      onClick={cancelEditCommentHandler}
                    >
                      취소
                    </StCancelBtn>
                    <StAddBtn
                      type="button"
                      onClick={() =>
                        saveEditedCommentHandler(comment.commentId)
                      }
                    >
                      저장
                    </StAddBtn>
                  </StCorrctionBtnBox>
                </StCorrectionInputField>
              ) : (
                <StNickName>{comment.comment}</StNickName>
              )}
              <StCreatedNum>
                {new Date(comment.createdAt).toISOString().split("T")[0]}
              </StCreatedNum>
            </StCommnetListField>
          ) : (
            <StCommnetListField>
              <StNickName>{comment.nickName}</StNickName>
              <StCommentBox>{comment.comment}</StCommentBox>
              <StCreatedNum>
                {new Date(comment.createdAt).toISOString().split("T")[0]}
              </StCreatedNum>
            </StCommnetListField>
          )}
        </StCommnetContainer>
      ))}
      {selectedComment && (
        <div
          role="presentation"
          onClick={() => {
            setSeletedComment(null);
          }}
          style={{
            display: "block",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 999,
            background: "transparent",
            border: "none",
          }}
        />
      )}
    </StContainer>
  );
}

export default Comment;

Comment.propTypes = {
  boat: PropTypes.node.isRequired,
  boatId: PropTypes.node.isRequired,
  renderTriggerHandler: PropTypes.node.isRequired,
};

const StContainer = styled.div`
  width: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StInputField = styled.div`
  width: 95%;
  background-color: #fff;
  border: 2px solid var(--gr-light, #a2acbd);

  border-radius: 15px;
  margin: 30px auto;
  /* margin-left: 13px; */
  display: flex;
  justify-content: space-between;
  text-align: center;
  overflow: hidden;
`;

const StInputBox = styled.textarea`
  width: 230px;
  height: 100%;
  border: none;
  outline: none;
  background-color: rgba(255, 255, 255, 0);
  padding: 12px;
  resize: none;
  overflow: hidden;
  line-height: 1.3;
`;

const StInputBtn = styled.button`
  width: 65px;
  height: 55px;
  padding: 8px;
  border: none;
  border-radius: 12px;
  background: var(--gr-light, #30a2ff);
  color: var(--gr-white, #fff);
  font-size: 14px;

  &.empty {
    background-color: #a2acbd;
    /* 비어있는 입력을 나타내기 위한 추가 스타일을 지정합니다. */
  }
`;

const StCommnetContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 328px;
  margin: 20px auto;
  font-size: 16px;
  font-family: Pretendard;
`;

const StCommnetModalOpenBtn = styled.button`
  border: 0;
  background-color: #fff;

  width: 24px;
  height: 24px;
`;
const StMoreIcImg = styled.img`
  width: 100%;
  height: 100%;
`;

const StModalContainer = styled.div`
  /* 모달 컨테이너 스타일 */

  position: absolute;
  background-color: #fff;
  display: flex;
  z-index: 9999;
  width: 100px;
  /* transform: translate(100%, -4%); */
  top: 100%;

  right: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  border: 1px solid #ccc;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 5px;
  border-radius: 15px;
`;

const StCorrectionBtn = styled.button`
  background-color: #fff;
  height: 40px;
  border: none;
  margin-bottom: 8px;
  color: var(--gr-deep, #3e4756);
  text-align: center;
  font-size: 14px;
  font-family: Pretendard;
  line-height: 20px;
`;

const StDeleteBtn = styled(StCorrectionBtn)`
  color: #ea122b;
  font-weight: 700;
  margin-bottom: 0;
`;

const StCommnetListField = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 10px;

  margin-bottom: 10px;
`;

const StCommentUserNic = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0;
`;

const StLine = styled.div`
  width: 360px;
  height: 8px;
  background: var(--gr-pale, #eff4f8);
  margin: 40px 0;
`;

const StCorrectionInputField = styled.div`
  width: 100%;
  background-color: #fff;
  border: 2px solid #a2acbd;
  border-radius: 15px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  /* background-color: var(--gr-pale); */

  padding: 16px 16px 8px 16px;
`;

const StCorrectionInput = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background-color: rgba(255, 255, 255, 0);
  padding: 12px;

  color: var(--gr-black, #222);
  font-size: 16px;
  font-family: Pretendard;
  font-weight: 500;
  line-height: 24px;
  resize: none;
  overflow: hidden;
  line-height: 1.3;
`;

const StCorrctionBtnBox = styled.div`
  display: flex;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const StCancelBtn = styled.button`
  border: none;
  width: 55px;
  height: 36px;
  color: #9c9c9c;
  background-color: #fff;
  border-radius: 8px;
  margin-right: 28px;
`;

const StAddBtn = styled.button`
  border: none;
  width: 55px;
  height: 36px;
  color: #fff;
  background-color: #30a2ff;
  border-radius: 8px;
`;

const StNickName = styled.span`
  font-size: 16px;
  font-weight: 500;
  font-family: Pretendard;
  color: #222;
  margin-bottom: 8px;
  white-space: pre-line;
`;
const StCommentBox = styled(StNickName)`
  white-space: pre-line;
`;

const StCreatedNum = styled.span`
  color: #9c9c9c;
  font-size: 14px;
  font-family: Pretendard;
  margin-bottom: 8px;
`;
