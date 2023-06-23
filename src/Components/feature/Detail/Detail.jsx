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
  const [renderTrigger, setRenderTrigger] = useState(false);
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
      setBoat(data);
      setPersonType(data.personType);
      console.log("data", data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching post:", error);
      setIsLoading(false);
    }
  };

  const renderTriggerHandler = () => {
    setRenderTrigger(!renderTrigger);
  };

  useEffect(() => {
    fetchBoat();
  }, [renderTrigger]);

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

  let componentToRender;

  if (isLoading) {
    componentToRender = <div>Loading...</div>;
  } else if (personType === "captain") {
    componentToRender = (
      <Captindetail
        boat={boat}
        boatId={id}
        renderTriggerHandler={renderTriggerHandler}
      />
    );
  } else if (personType === "crew") {
    componentToRender = (
      <Crewdetail
        boat={boat}
        boatId={id}
        renderTriggerHandler={renderTriggerHandler}
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

    //
    //     </>
    //   )}
    // </div>
  );
}

export default Detail;
