import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthApi from "shared/api";

function Boatlist() {
  const [boatList, setBoatList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getBoatList = async () => {
    try {
      const { data } = await AuthApi.getBoatList();
      // console.log(data);
      setBoatList(data.boats);
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
        boatList.map((item) => (
          <div key={item.boatId}>
            <div>{item.title}</div>
            <div>
              모집인원 : {item.crewNum}/{item.maxCrewNum}
            </div>
            <div>마감일: {item.endDate}</div>
            <Link to={`/boat/${item.boatId}`}>
              <button type="button">자세히보기</button>
            </Link>
          </div>
        ))
      )}
    </div>
  );
}
export default Boatlist;
