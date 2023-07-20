import React, { useState, useRef } from "react";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import defualtpic from "imgs/defualtpic.jpg";
import { useLocation } from "react-router-dom";
import Profileimg from "imgs/profile_photo_edit.png";
import AuthApi from "shared/api";

function Profile() {
  const [cookies] = useCookies(["authorization"]);
  const [imgFile, setImgFile] = useState(null);
  const location = useLocation();
  const myInfo = location.state;
  const imageInput = useRef();

  const onCickImageUpload = () => {
    imageInput.current.click();
  };

  const saveImgFile = async (e) => {
    setImgFile(URL.createObjectURL(e.target.files[0]));
    console.log(e.target.files[0].name);
    const config = {
      headers: {
        authorization: cookies.authorization,
        "Content-Type": "multipart/form-data",
      },
    };

    // 서버 api에 Post 요청
    const formData = new FormData();

    formData.append("image", e.target.files[0]);
    console.log(formData);
    try {
      const res = await AuthApi.myPageEdit(formData, config);
      alert(res.data.message);
    } catch (err) {
      alert(err.response.data.errorMessage);
    }
  };
  console.log("img", imgFile);

  return (
    <div>
      <StProfileCorrectionBox>
        <StProfileImg src={imgFile} />
        <form encType="multipart/form-data">
          <input
            type="file"
            name="image"
            style={{ display: "none" }}
            ref={imageInput}
            onChange={saveImgFile}
          />
          <StimgCorrectionBtn
            onClick={onCickImageUpload}
            src={Profileimg}
            alt="Upload Profile"
          />
        </form>
      </StProfileCorrectionBox>
      <StNicMessageBox>
        <StSubTitle>프로필 편집</StSubTitle>
        <StNicBox>
          <StNicTitle>이름</StNicTitle>
          <StNicText>{myInfo.user.nickName}</StNicText>
        </StNicBox>
        <div>
          <StMessageTitle>상태메세지</StMessageTitle>
          <StMyMessage>{myInfo.user.myMessage}</StMyMessage>
        </div>
      </StNicMessageBox>
      <div>
        <button type="submit">취소</button>
        <button type="submit">저장</button>
      </div>
    </div>
  );
}
const StProfileCorrectionBox = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  background-color: #eff4f8;
  width: 100%;
  height: 240px;
`;
const StProfileImg = styled.img`
  display: block;

  width: 160px;
  height: 160px;
  border-radius: 12px;
  background-color: #fff;
  background-image: url(${defualtpic});
  box-shadow: 0px 1px 2px 2px rgba(0.85, 0.85, 0.85, 0.05);
`;

const StimgCorrectionBtn = styled.img`
  position: absolute;
  width: 32px;
  height: 32px;
  bottom: 40px;
  right: 84px;
`;
const StNicMessageBox = styled.div`
  margin: 10px 24px;
  padding: 10px 10px;
`;

const StSubTitle = styled.p`
  font-size: 14px;
  font-family: Pretendard;
  color: #222;
  margin-bottom: 20px;
`;
const StNicBox = styled.div`
  margin-bottom: 32px;
`;

const StNicTitle = styled.p`
  color: #3e4756;
  font-size: 14px;
  font-family: Pretendard;
  margin-bottom: 8px;
`;
const StNicText = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  height: 44px;
  border: 1px solid #a2acbd;
  outline: none;
  resize: none;
  color: #000;
  border-radius: 12px;
  padding: 10px 12px;
`;

const StMessageTitle = styled(StNicTitle)``;

const StMyMessage = styled(StNicText)`
  height: 120px;
`;
export default Profile;
