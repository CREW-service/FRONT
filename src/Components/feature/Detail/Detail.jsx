import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import DOMPurify from "dompurify"; // DOMPurify 라이브러리 가져오기
import AuthApi from "shared/api";
// import Detailoptinmodal from "./Detailoptinmodal";

function Detail() {
  const { id } = useParams();
  const [boat, setBoat] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const fetchBoat = async () => {
    try {
      const { data } = await AuthApi.getBoatDetail(id);
      setBoat(data.boat);
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching post:", error);
      setIsLoading(false);
    }
  };

  const [cookies] = useCookies(["authorization"]);
  const config = {
    headers: {
      // 쿠키를 헤더에 추가
      authorization: cookies.authorization,
    },
  };

  const joinBoatHandler = async () => {
    try {
      const res = await AuthApi.joinBoat(id, config);
      {
        console.log(res);
      }
      // console.log(res);
    } catch (error) {
      console.log("Error:", error);
      alert(error.response.data.errorMessage);
    }
  };

  // 버튼 클릭시 참여하기 버튼 안보이기
  const [isVisible, setIsVisible] = useState(true);
  const visibleHandler = () => {
    setIsVisible(false);
  };
  // 버튼 클릭시 댓글 div 보이기
  const [showComment, setShowComment] = useState(false);
  const ShowCommentClickBtn = () => {
    setShowComment(true);
  };

  // // 모달창 노출 여부 state
  // const [modalOpen, setModalOpen] = useState(false);

  // // 모달창 노출
  // const showModal = () => {
  //   setModalOpen(true);
  // };

  useEffect(() => {
    fetchBoat();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div>제목 : {boat.title}</div>
          <div>
            작성일 : {new Date(boat.createdAt).toISOString().split("T")[0]}
            <br />
            작성자 : {boat.captain}
          </div>
          <div>지역: {boat.address}</div>
          <div>모집 기한: {boat.endDate}</div>
          <div>
            모집 인원: {boat.crewNum}/{boat.maxCrewNum}
          </div>
          <div>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(boat.content),
              }}
            />
          </div>
          {isVisible && (
            <button
              type="button"
              onClick={() => {
                joinBoatHandler();
                visibleHandler();
                ShowCommentClickBtn();
              }}
            >
              참여하기
            </button>
          )}
          {showComment && <div>comment</div>}

          {/* <div>
            <button type="button" onClick={showModal}>
              모달띄우기
            </button>
            {modalOpen && <Detailoptinmodal setModalOpen={setModalOpen} />}
          </div> */}
        </>
      )}
    </div>
  );
}

export default Detail;
