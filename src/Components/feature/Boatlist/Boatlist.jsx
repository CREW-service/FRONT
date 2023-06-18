import React, { useEffect, useState } from "react";
import AuthApi from "shared/api";

function Boatlist() {
  const [boatList, setBoatList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getBoatList = async () => {
    try {
      const { data } = await AuthApi.getBoatList();
      // console.log(data);
      const boatListData = data.boats[0];
      setBoatList(boatListData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching post:", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getBoatList();
  }, []);
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div>{boatList.title}</div>
          <div>
            모집인원 : {boatList.crewNum}/{boatList.maxCrewNum}
          </div>
          <div>마감일: {boatList.endDate}</div>
          <button type="button">자세히보기</button>
        </>
      )}
    </div>
  );
}
export default Boatlist;
