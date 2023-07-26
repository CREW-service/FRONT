import React, { useState, useEffect, useRef } from "react";
import { currentUserIdAtom } from "Recoil/recoilAtoms";
import { useRecoilState } from "recoil";
import { useCookies } from "react-cookie";
import AuthApi from "shared/api";
import PropTypes from "prop-types";
// import Commentmodal from "../Modal/Commentmodal";

function Correctionomment({ boat, boatId, renderTriggerHandler }) {
  const [currentUserId, setCurrentUserId] = useRecoilState(currentUserIdAtom);
  const [comments, setComments] = useState([]);
  const [selectedComment, setSeletedComment] = useState(false);

  const [cookies] = useCookies(["authorization"]);

  const modalRef = useRef(null);

  // X 버튼 클릭 코멘트 수정삭제버튼 off
  const closeModal = () => {
    setSeletedComment(false);
  };

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
  }, [setSeletedComment]);

  const commentChangeHandler = (event) => {
    setComments(event.target.value);
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
    <div>
      <div>
        <input
          type="text"
          placeholder="댓글을 입력하세요"
          value={comments}
          onChange={commentChangeHandler}
        />
        <button type="button" onClick={commentInputHandler}>
          게시
        </button>
      </div>
      <div>
        {boat.comments.map((comment) => (
          <div
            style={{
              border: "1px solid ",
            }}
            key={comment.commentId}
          >
            {comment.comment}
            <div>
              {currentUserId === comment.userId && (
                <button
                  type="button"
                  onClick={() => setSeletedComment(comment.commentId)}
                >
                  글수정삭제btn
                </button>
              )}

              <div>
                {selectedComment === comment.commentId && (
                  <div
                    id={comment.commentId}
                    style={{
                      border: "1px solid ",
                      width: "200px",
                      height: "250px",
                    }}
                    ref={modalRef}
                  >
                    <button type="button" onClick={closeModal}>
                      X
                    </button>
                    <button type="button">수정</button>
                    <button
                      type="button"
                      onClick={() => deleteCommentHandler(comment.commentId)}
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Correctionomment;

Correctionomment.propTypes = {
  boat: PropTypes.node.isRequired,
  boatId: PropTypes.node.isRequired,
  renderTriggerHandler: PropTypes.node.isRequired,
};
