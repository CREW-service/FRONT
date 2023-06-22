import React from "react";

function Comment() {
  // 댓글 창 구현
  const [comments, setComments] = useState("");
  const commentChangeHandler = (event) => {
    setComments(event.target.value);
  };
  // 댓글 게시 버튼 클릭
  const clickAddBtnHandler = () => {
    const newComment = {
      commentId: comments.length + 1,
    };
    setComments([...comments, newComment]);
    setComments("");
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
        <button type="button" onClick={clickAddBtnHandler}>
          게시
        </button>
      </div>
      <div>{comments}</div>
    </div>
  );
}

export default Comment;
