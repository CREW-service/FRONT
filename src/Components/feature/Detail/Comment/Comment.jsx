import React, { useState, useEffect, useRef } from "react";
import { currentUserIdAtom } from "Recoil/recoilAtoms";
import { useRecoilState } from "recoil";
import { useCookies } from "react-cookie";
import AuthApi from "shared/api";
import PropTypes from "prop-types";
import { styled } from "styled-components";
import MORE_IC from "./more_ic.png";
// import Commentmodal from "../Modal/Commentmodal";

function Comment({ boat, boatId, renderTriggerHandler }) {
  const [currentUserId, setCurrentUserId] = useRecoilState(currentUserIdAtom);
  const [comments, setComments] = useState([]);
  const [selectedComment, setSeletedComment] = useState(null);
  const [cookies] = useCookies(["authorization"]);

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

  return (
    <StContainer>
      <StInputField>
        <StInputBox
          type="text"
          placeholder="댓글을 입력하세요"
          value={comments}
          onChange={commentChangeHandler}
        />
        <StInputBtn type="button" onClick={commentInputHandler}>
          저장
        </StInputBtn>
      </StInputField>
      {boat.comments.map((comment) => (
        <StCommnetContainer key={comment.commentId}>
          {currentUserId === comment.userId ? (
            <StCommnetListField>
              <StCommentUserNic>
                <span>{comment.nickname}</span>
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
                <>
                  <input value={modiyValue} onChange={modiyHandler} />
                  <button type="button">취소</button>
                  <button
                    type="button"
                    onClick={() => saveEditedCommentHandler(comment.commentId)}
                  >
                    저장
                  </button>
                </>
              ) : (
                <span>{comment.comment}</span>
              )}

              {/* <span>{comment.createAt}</span> */}
            </StCommnetListField>
          ) : (
            <StCommnetListField>
              <span>{comment.nickname}</span>
              <span>{comment.comment}</span>
              {/* <span>{comment.createAt}</span> */}
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
  width: 360px;
`;

const StInputField = styled.div``;

const StInputBox = styled.input``;

const StInputBtn = styled.button``;

const StCommnetContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
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
`;

const StCloseModalBtn = styled.button``;

const StCorrectionBtn = styled.button``;

const StDeleteBtn = styled.button``;

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
`;
