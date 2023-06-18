import React, { useEffect, useState } from "react";
import AuthApi from "shared/api";

function Detail() {
  const boatId = 3;

  const [boat, setBoat] = useState("");
  // console.log(boat);
  const [isLoading, setIsLoading] = useState(true);
  const fetchBoat = async () => {
    try {
      const { data } = await AuthApi.getBoatDetail(boatId);
      // console.log(data);
      setBoat(data.boat);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching post:", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchBoat();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div>{boat.title}</div>
          <div>
            {new Date(boat.createdAt).toISOString().split("T")[0]}{" "}
            {boat.captain}
          </div>
          <div>지역: {boat.address}</div>
          <div>모집 기한: {boat.endDate}</div>
          <div>
            모집 인원: {boat.crewNum}/{boat.maxCrewNum}
          </div>
          <button type="button">참여하기</button>
        </>
      )}
    </div>
  );
}

export default Detail;
