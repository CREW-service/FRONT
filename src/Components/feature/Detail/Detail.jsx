import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import AuthApi from "shared/api";
import { personTypeAtom, boatAtom } from "Recoil/recoilAtoms";
import { useRecoilState } from "recoil";
import LOADING from "imgs/loading.gif"
import Captaindetail from "./Captaindetail";
import Crewdetail from "./Crewdetail";
import Otherpeople from "./Otherpeople";

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

  const [boat, setBoat] = useRecoilState(boatAtom);

  const [personType, setPersonType] = useRecoilState(personTypeAtom);

  const [isLoading, setIsLoading] = useState(true);

  const fetchBoat = async () => {
    try {
      const { data } = await AuthApi.getBoatDetail(id, config);
      // console.log("data", data);
      setBoat(data);
      setPersonType(data.personType);
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

  let componentToRender;

  if (isLoading) {
    componentToRender = <div><img src="LOADING" alt="loading,,," /></div>;
  } else if (personType === "captain") {
    componentToRender = (
      <Captaindetail
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
    componentToRender = (
      <Otherpeople boat={boat} renderTriggerHandler={renderTriggerHandler} />
    );
  }

  return (
    <div style={{ width: "95%", margin: "0 auto" }}>{componentToRender}</div>
  );
}

export default Detail;
