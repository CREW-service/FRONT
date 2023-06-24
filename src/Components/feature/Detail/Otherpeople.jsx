import React from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import PropTypes from "prop-types";
import DOMPurify from "dompurify"; // DOMPurify 라이브러리 가져오기
import AuthApi from "shared/api";

function Otherpeople({ boat }) {
  const { id } = useParams();
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
        console.log("res", res);
      }
    } catch (error) {
      console.log("Error:", error);
      alert("참가못했습니다");
      // alert(error.response.data.errorMessage);
    }
  };
  return (
    <div>
      <div>
        <div>제목 : {boat.boat.title}</div>
        <div>
          작성일 : {new Date(boat.boat.createdAt).toISOString().split("T")[0]}
          <br />
          작성자 : {boat.boat.captain}
        </div>
        <div>지역: {boat.boat.address}</div>
        <div>모집 기한: {boat.boat.endDate}</div>
        <div>
          모집 인원: {boat.boat.crewNum}/{boat.boat.maxCrewNum}
        </div>
        <div>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(boat.boat.content),
            }}
          />
        </div>

        <button
          type="button"
          onClick={() => {
            joinBoatHandler();
          }}
        >
          참여하기
        </button>
      </div>
    </div>
  );
}

export default Otherpeople;

Otherpeople.propTypes = {
  boat: PropTypes.node.isRequired,
};
