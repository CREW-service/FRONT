import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { currentUserIdAtom } from "Recoil/recoilAtoms";
import { useCookies } from "react-cookie";
import AuthApi from "shared/api";
import PropTypes from "prop-types";
import Commentmodal from "../Modal/Commentmodal";

function Comment({ boat, boatId, renderTriggerHandler }) {
  console.log("boat", boat);

  const [comments, setComments] = useState([]);
  const [cookies] = useCookies(["authorization"]);
  const [currentUserId, setCurrentUserId] = useRecoilState(currentUserIdAtom);

  const commentChangeHandler = (event) => {
    setComments(event.target.value);
  };

  const commentHandler = async (e) => {
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

      const config = {
        headers: {
          authorization: cookies.authorization,
        },
      };
      const res = await AuthApi.comment(boatId, newComment, config);
      alert(res.data.message);
      setComments("");
      renderTriggerHandler();
    } catch (err) {
      alert(err.response.data.errorMessage);
    }
  };

  // 모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);

  // 모달창 노출
  const showModal = () => {
    setModalOpen(true);
  };

  const [selectedComment, setSeletedComment] = useState(null);

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="댓글을 입력하세요"
          value={comments}
          onChange={commentChangeHandler}
        />
        <button type="button" onClick={commentHandler}>
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
              <button
                type="button"
                onClick={() => setSeletedComment(comment.commentId)}
              >
                글수정삭제btn
              </button>

              {selectedComment === comment.commentId && (
                <Commentmodal
                  boatId={boatId}
                  comment={comment}
                  renderTriggerHandler={renderTriggerHandler}
                  closeModal={setSeletedComment}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comment;

Comment.propTypes = {
  boat: PropTypes.node.isRequired,
  boatId: PropTypes.node.isRequired,
  renderTriggerHandler: PropTypes.node.isRequired,
};
