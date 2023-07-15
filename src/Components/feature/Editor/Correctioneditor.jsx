import React, { useState, useEffect } from "react";
import AuthApi from "shared/api";
import { useCookies } from "react-cookie";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// styled...
import styled from "styled-components";

import { useRecoilState } from "recoil";
import {
  markerAddressAtom,
  recoilLatLngAtom,
  boatAtom,
} from "Recoil/recoilAtoms";
import { useNavigate } from "react-router-dom";

const recruitmentTypeList = ["같이 해요", "같이 먹어요", "같이 사요"];
const alertList = {
  noCookie: "로그인 정보가 올바르지 않습니다.",
  missingInfo: "필수 정보가 누락되었습니다.",
  // markerMiss:
  //   "지정된 모임 위치가 없습니다. 지도에서 모임 위치를 지정해 주세요!",
};

function Correctioneditor() {
  const [boat, setBoat] = useRecoilState(boatAtom);
  const endDate = !!(!boat.boat.endDate || boat.boat.endDate === "");

  const initialState = {
    recruitmentTitle: boat.boat.title,
    recruitmentCount: boat.boat.maxCrewNum,
    recruitmentDeadline: boat.boat.endDate,
    recruitmentType: boat.boat.keyword,
    isIndefiniteRecruitment: endDate,
  };

  const [state, setState] = useState(initialState);
  const [bodyContents, setBodyContent] = useState("");
  const [cookies] = useCookies(["authorization"]);
  const markerAddress = useRecoilState(markerAddressAtom);
  const [recoilLatLng, setRecoilLatLng] = useRecoilState(recoilLatLngAtom);

  const today = new Date().toISOString().split("T")[0];
  // setBodyContent(boat.boat.content);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!cookies.authorization) {
  //     // 쿠키가 없을 경우 접근 차단
  //     // 예: 리다이렉션을 사용하여 로그인 페이지로 이동
  //     // window.location.href = "/login"; // 로그인 페이지로 이동하는 경우
  //     // 또는 아래와 같이 접근 차단 메시지를 렌더링하거나 다른 작업을 수행할 수 있습니다.
  //     alert(alertList.noCookie);
  //     navigate("/signin");
  //     return;
  //   }
  //   // if (recoilLatLng.lat === null || recoilLatLng.lng === null) {
  //   //   alert(alertList.markerMiss);
  //   //   navigate("/");
  //   // }
  // }, []);

  useEffect(() => {
    // 기존 글을 Quill에 설정합니다.
    setBodyContent(boat.boat.content);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = value;

    if (name === "recruitmentCount") {
      // 값이 2보다 작으면 2로, 20보다 크면 20으로 설정합니다.
      const parsedValue = parseInt(value, 20);
      newValue = Math.min(Math.max(parsedValue, 2), 20);
    } else {
      newValue = type === "checkbox" ? checked : value;
    }

    setState((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  }

  const handleDecrement = () => {
    setState((prevState) => ({
      ...prevState,
      recruitmentCount: Math.max(prevState.recruitmentCount - 1, 2),
    }));
  };

  const handleIncrement = () => {
    setState((prevState) => ({
      ...prevState,
      recruitmentCount: Math.min(prevState.recruitmentCount + 1, 20),
    }));
  };

  const onChangeBodyHandler = (contents) => {
    setBodyContent(contents);
  };

  const cancelButtonHandler = () => {
    navigate("/boat/:id");
  };

  const onSubmitHandler = async () => {
    if (!state.recruitmentTitle || !bodyContents || !state.recruitmentCount) {
      alert(alertList.missingInfo);
      return;
    }

    // 상시 모집인 경우 endDate 값을 null로 설정, 그렇지 않은 경우 빈 문자열("")로 설정
    const newEndDate = state.isIndefiniteRecruitment
      ? null
      : state.recruitmentDeadline;

    const correctionPost = {
      title: state.recruitmentTitle,
      content: bodyContents,
      keyword: state.recruitmentType,
      maxCrewNum: state.recruitmentCount,
      endDate: newEndDate,
      address: boat.boat.address,
      latitude: boat.boat.latitude,
      longitude: boat.boat.longitude,
    };
    const config = {
      headers: {
        authorization: cookies.authorization,
      },
    };
    try {
      const res = await AuthApi.correctionWrite(
        boat.boat.boatId,
        correctionPost,
        config
      );
      alert(res.data.message);
      setRecoilLatLng({ lat: null, lng: null });
      navigate("/main");
    } catch (err) {
      alert(err.response.data.errorMessage);
    }
  };

  return (
    <StContainer>
      <StEditorContainer>
        <StTextField>
          <StSpanText>제목:</StSpanText>
          <StInputField
            type="text"
            placeholder="제목"
            name="recruitmentTitle"
            value={state.recruitmentTitle}
            onChange={handleChange}
          />
        </StTextField>
        <StTextField>
          <StSpanText>모집 기한:</StSpanText>
          <StInputField
            placeholder="모집 기한"
            type="date"
            name="recruitmentDeadline"
            value={state.recruitmentDeadline}
            onChange={handleChange}
            disabled={state.isIndefiniteRecruitment}
            min={today}
          />
        </StTextField>
        <StTextField>
          <StSpanText>상시 모집:</StSpanText>
          <StInputCheakBox
            type="checkbox"
            name="isIndefiniteRecruitment"
            checked={state.isIndefiniteRecruitment}
            onChange={handleChange}
          />
        </StTextField>
        <StTextField>
          <StSpanText>모집 인원:</StSpanText>
          <StInputNumberBox>
            <StCounterButton type="button" onClick={handleDecrement}>
              -
            </StCounterButton>
            <StInputNumberField
              type="number"
              name="recruitmentCount"
              value={state.recruitmentCount}
              onChange={handleChange}
            />
            <StCounterButton type="button" onClick={handleIncrement}>
              +
            </StCounterButton>
          </StInputNumberBox>
        </StTextField>
        <StTextField>
          <StSpanText>모임 유형:</StSpanText>
          <StSelectBox
            name="recruitmentType"
            value={state.recruitmentType}
            onChange={handleChange}
          >
            {recruitmentTypeList.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </StSelectBox>
        </StTextField>
        <ReactQuill
          value={bodyContents}
          onChange={onChangeBodyHandler}
          modules={modules}
        />
      </StEditorContainer>
      {/* 버튼 */}
      <StEditorBtnBox>
        <StCancelButton type="button" onClick={cancelButtonHandler}>
          취소
        </StCancelButton>
        <StSubmitButton type="button" onClick={onSubmitHandler}>
          저장
        </StSubmitButton>
      </StEditorBtnBox>
    </StContainer>
  );
}

export default Correctioneditor;

const StContainer = styled.div`
  margin: 0 auto;
  width: 95%;
`;

const StEditorContainer = styled.div`
  color: var(--gr-black, #222);
  /* Body/L */
  font-size: 16px;
  font-family: Pretendard;
  font-weight: 500;
  line-height: 24px;
`;

const StTextField = styled.div`
  display: flex;
  width: 100%;
  height: 56px;
  align-items: center;
`;

const StSpanText = styled.span`
  height: 40px;
  width: 80px;

  display: flex;
  flex-direction: row;
  align-items: center;
  /* justify-content: center; */
`;
const StInputField = styled.input`
  width: 100%;
  height: 40px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  border-radius: 4px;
  border: solid 2px #eff4f8;
  background-color: #fff;
`;

const StInputNumberBox = styled.div`
  width: 100%;
  height: 40px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StInputCheakBox = styled.input`
  height: 40px;
  width: 40px;
`;

const StInputNumberField = styled.input`
  width: 100%;
  height: 40px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  border-radius: 4px;
  border: solid 2px #eff4f8;
  background-color: #fff;

  text-align: center;

  -moz-appearance: textfield; /* Firefox */

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const StSelectBox = styled.select`
  width: 100%;
  height: 40px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  border-radius: 4px;
  border: solid 2px #eff4f8;
  background-color: #fff;
`;

const StCounterButton = styled.button`
  width: 40px;
  height: 40px;
  background-color: #fff;
  color: #1f67a1;
  font-size: 38px;
  border: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
`;

const StEditorBtnBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StCancelButton = styled.button`
  width: 156px;
  height: 68px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  margin: 68px 16px 40px;
  padding: 16px 40px;
  border: 0;
  /* border: solid 1px #3e4756; */
  border-radius: 35px;
  background-color: #fff;

  box-shadow: 0px 8px 10px 0px rgba(0, 0, 0, 0.05);

  font-family: Pretendard;
  font-size: 24px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: center;
  color: #3e4756;
  cursor: pointer;
`;
const StSubmitButton = styled.button`
  width: 156px;
  height: 68px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  margin: 68px 16px 40px;
  padding: 16px 40px;
  border: 0;
  border-radius: 35px;
  background-color: #30a2ff;

  box-shadow: 0px 8px 10px 0px rgba(0, 0, 0, 0.05);

  font-family: Pretendard;
  font-size: 24px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: center;
  color: #fff;

  cursor: pointer;
`;
// 에디터의 모듈 정의
const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ align: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, "link"],
      [
        {
          color: [
            "#000000",
            "#e60000",
            "#ff9900",
            "#ffff00",
            "#008a00",
            "#0066cc",
            "#9933ff",
            "#ffffff",
            "#facccc",
            "#ffebcc",
            "#ffffcc",
            "#cce8cc",
            "#cce0f5",
            "#ebd6ff",
            "#bbbbbb",
            "#f06666",
            "#ffc266",
            "#ffff66",
            "#66b966",
            "#66a3e0",
            "#c285ff",
            "#888888",
            "#a10000",
            "#b26b00",
            "#b2b200",
            "#006100",
            "#0047b2",
            "#6b24b2",
            "#444444",
            "#5c0000",
            "#663d00",
            "#666600",
            "#003700",
            "#002966",
            "#3d1466",
            "custom-color",
          ],
        },
        { background: [] },
      ],
    ],
  },
};
