import React, { useEffect, useState } from "react";
import AuthApi from "shared/api";

function Boatlist() {
  const [boatList, setBoatList] = useState([]);
  const getBoatList = async () => {
    const { data } = await AuthApi.getBoatList();
    const boatListData = data.boats[0];
    console.log(boatListData);
    setBoatList(boatListData);
  };
  useEffect(() => {
    getBoatList();
  }, []);
  return (
    <>
      <div>{boatList.title}</div>
      <div>모집인원 : {boatList.boatId}</div>
      <div>마감일: {boatList.endDate}</div>
    </>
  );
}
export default Boatlist;