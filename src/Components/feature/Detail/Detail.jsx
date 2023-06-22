import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import DOMPurify from "dompurify"; // DOMPurify 라이브러리 가져오기
import AuthApi from "shared/api";
import Captindetail from "./Captindetail";
import Crewdetail from "./Crewdetail";
import Otherpeople from "./Otherpeople";
// import Detailoptinmodal from "./Detailoptinmodal";

function Detail() {
  const [cookies] = useCookies(["authorization"]);
  const config = {
    headers: {
      // 쿠키를 헤더에 추가
      authorization: cookies.authorization,
    },
  };

  const { id } = useParams();

  const [boat, setBoat] = useState("");
  const [personType, setPersonType] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchBoat = async () => {
    try {
      const { data } = await AuthApi.getBoatDetail(id, config);
      // console.log("data", data);
      setBoat(data.boat);
      setPersonType(data.personType);
      console.log("data", data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching post:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBoat();
  }, []);

  const joinBoatHandler = async () => {
    try {
      const res = await AuthApi.joinBoat(id, config);
      {
        console.log("res", res);
      }
    } catch (error) {
      console.log("Error:", error);
      alert("참가못했습니다");
      // alert(error.response.data.errorMessage);
    }
  };

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

  let componentToRender;

  if (isLoading) {
    componentToRender = <div>Loading...</div>;
  } else if (personType === "captain") {
    componentToRender = <Captindetail boat={boat} />;
  } else if (personType === "crew") {
    componentToRender = (
      <Crewdetail
        boat={boat}
        comments={comments}
        commentChangeHandler={commentChangeHandler}
        clickAddBtnHandler={clickAddBtnHandler}
      />
    );
  } else {
    componentToRender = <Otherpeople joinBoatHandler={joinBoatHandler} />;
  }

  return (
    <div>{componentToRender}</div>

    //

    //       <button
    //         type="button"
    //         onClick={() => {
    //           joinBoatHandler();
    //         }}
    //       >
    //         참여하기
    //       </button>

    //       <div>
    //         <div>
    //           <input
    //             type="text"
    //             placeholder="댓글을 입력하세요"
    //             value={comments}
    //             onChange={commentChangeHandler}
    //           />
    //           <button type="button" onClick={clickAddBtnHandler}>
    //             게시
    //           </button>
    //         </div>
    //         <div>{comments}</div>
    //       </div>
    //     </>
    //   )}
    // </div>
  );
}

export default Detail;
