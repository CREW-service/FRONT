import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import AuthApi from "shared/api";

function Detail() {
  const {id} = useParams();

  const [boat, setBoat] = useState("");
  // console.log(boat);
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchBoat = async () => {
    try {
      const { data } = await AuthApi.getBoatDetail(id);
      setBoat(data.boat);
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
      console.log(res);
    } catch (error) {
      console.error("Error:", error);
    }
  }

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
            작성일 : {new Date(boat.createdAt).toISOString().split("T")[0]}<br/>
            작성자 : {boat.captain} 
          </div>
          <div>지역: {boat.address}</div>
          <div>모집 기한: {boat.endDate}</div>
          <div>
            모집 인원: {boat.crewNum}/{boat.maxCrewNum}
          </div>
          <button type="button" onClick={joinBoatHandler}>참여하기</button>
        </>
      )}
    </div>
  );
}

export default Detail;
