import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import AuthApi from "shared/api";
import PropTypes from "prop-types";

function Comment({ boat, boatId, renderTriggerHandler }) {
  const [comments, setComments] = useState([]);

  const [cookies] = useCookies(["authorization"]);
  console.log("boat", boat);

  const commentChangeHandler = (event) => {
    setComments(event.target.value);
  };

  const commentHandler = async (e) => {
    e.preventDefault();
    if (comments.length === 0) {
      alert("글을입력해");
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
          <div key={comment.id}>{comment.comment}</div>
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
