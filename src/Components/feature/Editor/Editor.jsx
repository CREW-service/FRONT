import React, { useState } from "react";
import { AuthApi } from "shared/api";
import { useCookies } from "react-cookie";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// styled...
import styled from "styled-components";

const recruitmentNum = [2, 3, 4, 5, 6, 7, 8];
const recruitmentTypeList = ["같이 해요", "같이 먹어요", "같이 사요"];
const alertList = {
  noCookie: "로그인 정보가 올바르지 않습니다.",
  missingInfo: "필수 정보가 누락되었습니다.",
};

function Editor() {
  const [recruitmentTitle, setRecruitmentTitle] = useState("");
  const [recruitmentCount, setRecruitmentCount] = useState(0);
  const [recruitmentDeadline, setRecruitmentDeadline] = useState("");
  const [recruitmentType, setRecruitmentType] = useState("");
  const [bodyContents, setBodyContent] = useState("");
  const [isIndefiniteRecruitment, setIsIndefiniteRecruitment] = useState(false);

  const onChangeRecruitmentTitleHandler = (e) => {
    setRecruitmentTitle(e.target.value);
  };

  const onChangeRecrutmentCountHandler = (e) => {
    setRecruitmentCount(e.target.value);
  };

  const onChangeRecruitmentTypeHandler = (e) => {
    setRecruitmentType(e.target.value);
  };
  const onChangeRecruitmentDeadlineHandler = (e) => {
    setRecruitmentDeadline(e.target.value);
  };

  const onChangeIsIndefiniteRecruitment = () => {
    setIsIndefiniteRecruitment(!isIndefiniteRecruitment);
    if (isIndefiniteRecruitment) {
      setRecruitmentDeadline(""); // 모집 기한이 null일 경우 상시모집으로 처리
    }
  };

  const onChangeBodyHandler = (contents) => {
    setBodyContent(contents);
  };

  // 서버에 보내기 위한 데이터
  const newPost = {
    title: recruitmentTitle,
    content: bodyContents,
    keyword: recruitmentType,
    maxCrewNum: recruitmentCount,
    endDate: recruitmentDeadline,
    // address: string,
  };
  const [cookies] = useCookies(["authorization"]);
  const config = {
    headers: {
      // 쿠키를 헤더에 추가
      authorization: cookies.authorization,
    },
  };

  const onSubmiltHandler = async (e) => {
    e.preventDefault();
    if (!recruitmentTitle || !bodyContents || !recruitmentCount) {
      // 알럿 대신 모달 같은 것으로 경고를 보내 주는 것이 좋을 것 같아요.
      alert(alertList.missingInfo);
      return;
    }
    try {
      const res = await AuthApi.write(newPost, config);
      console.log(res);
    } catch (err) {
      console.log(err);
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
          value={recruitmentTitle}
          onChange={onChangeRecruitmentTitleHandler}
        />
        모집 기한:
        <input
          placeholder="모집 기한"
          type="date"
          value={recruitmentDeadline}
          onChange={onChangeRecruitmentDeadlineHandler}
          disabled={isIndefiniteRecruitment}
        />
        <div>
          <input
            type="checkbox"
            checked={isIndefiniteRecruitment}
            onChange={onChangeIsIndefiniteRecruitment}
          />
          상시 모집
        </div>
        모집 인원:
        <select
          value={recruitmentCount}
          onChange={onChangeRecrutmentCountHandler}
        >
          {recruitmentNum.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        모임 유형:
        <select
          value={recruitmentType}
          onChange={onChangeRecruitmentTypeHandler}
        >
          {recruitmentTypeList.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ReactQuill onChange={onChangeBodyHandler} modules={modules} />
      </StEditorContainer>

      <div dangerouslySetInnerHTML={{ __html: bodyContents }} />
      {/* {process.browser ? (
        <div dangerouslySetInnerHTML={{ __html: bodyContents }} />
      ) : (
        <div />
      )} */}
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
