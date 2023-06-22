import React, { useState } from "react";
import AuthApi from "shared/api";
import { useCookies } from "react-cookie";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// styled...
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { markerAddressAtom, recoilLatLngAtom } from "Recoil/recoilAtoms";

const recruitmentNum = [2, 3, 4, 5, 6, 7, 8, 9, 10];
const recruitmentTypeList = ["같이 해요", "같이 먹어요", "같이 사요"];
const alertList = {
  noCookie: "로그인 정보가 올바르지 않습니다.",
  missingInfo: "필수 정보가 누락되었습니다.",
};

const initialState = {
  recruitmentTitle: "",
  recruitmentCount: 2,
  recruitmentDeadline: "",
  recruitmentType: recruitmentTypeList[0],
  isIndefiniteRecruitment: false,
};

function Editor() {
  const [state, setState] = useState(initialState);
  const [bodyContents, setBodyContent] = useState("");
  const [cookies] = useCookies(["authorization"]);
  const markerAddress = useRecoilState(markerAddressAtom);
  const recoilLatLng = useRecoilState(recoilLatLngAtom);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setState((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const onChangeBodyHandler = (contents) => {
    setBodyContent(contents);
  };

  const onSubmiltHandler = async (e) => {
    e.preventDefault();
    if (!state.recruitmentTitle || !bodyContents || !state.recruitmentCount) {
      alert(alertList.missingInfo);
      return;
    }
    try {
      const newPost = {
        title: state.recruitmentTitle,
        content: bodyContents,
        keyword: state.recruitmentType,
        maxCrewNum: state.recruitmentCount,
        endDate: state.recruitmentDeadline,
        address: markerAddress[0],
        latitude: String(recoilLatLng[0].lat),
        longitude: String(recoilLatLng[0].lng),
      };
      const config = {
        headers: {
          authorization: cookies.authorization,
        },
      };
      const res = await AuthApi.write(newPost, config);
      alert(res.data.message);
    } catch (err) {
      alert(err.response.data.errorMessage);
    }
  };

  return (
    <StContainer>
      {/* 버튼 */}
      <StEditorBtnBox>
        <button type="submit" onClick={onSubmiltHandler}>
          저장
        </button>
        <button type="button">취소</button>
      </StEditorBtnBox>
      <StEditorContainer>
        제목:
        <input
          type="text"
          placeholder="제목"
          name="recruitmentTitle"
          value={state.recruitmentTitle}
          onChange={handleChange}
        />
        모집 기한:
        <input
          placeholder="모집 기한"
          type="date"
          name="recruitmentDeadline"
          value={state.recruitmentDeadline}
          onChange={handleChange}
          disabled={state.isIndefiniteRecruitment}
        />
        <div>
          <input
            type="checkbox"
            name="isIndefiniteRecruitment"
            checked={state.isIndefiniteRecruitment}
            onChange={handleChange}
          />
          상시 모집
        </div>
        모집 인원:
        <select
          name="recruitmentCount"
          value={state.recruitmentCount}
          onChange={handleChange}
        >
          {recruitmentNum.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        모임 유형:
        <select
          name="recruitmentType"
          value={state.recruitmentType}
          onChange={handleChange}
        >
          {recruitmentTypeList.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ReactQuill onChange={onChangeBodyHandler} modules={modules} />
      </StEditorContainer>
    </StContainer>
  );
}

export default Editor;

// 디자인 영역
// // 임시 컨테이너
const StContainer = styled.div`
  margin: 20px auto;
  width: 80%;
`;

const StEditorContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

const StEditorBtnBox = styled.div``;

// 에디터의 모듈 정의
const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
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
