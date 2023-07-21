import React, { useState, useRef } from "react";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import defualtpic from "imgs/defualtpic.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import Profileimg from "imgs/profile_photo_edit.png";
import AuthApi from "shared/api";

function Profile() {
  const [cookies] = useCookies(["authorization"]);
  const [imgFile, setImgFile] = useState(null);
  const location = useLocation();
  const myInfo = location.state;
  const [nickName, setNickName] = useState(myInfo.user.nickName);
  const [myMessage, setMyMessage] = useState(myInfo.user.myMessage);
  const imageInput = useRef();

  const onCickImageUpload = () => {
    imageInput.current.click();
  };

  const saveFile = async (e) => {
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
    formData.append("nickName", nickName); // 수정된 닉네임
    formData.append("myMessage", myMessage); // 수정된 상태 메시지
    console.log(formData);

    try {
      const res = await AuthApi.myPageEdit(formData, config);
      alert(res.data.message);
    } catch (err) {
      alert(err.response.data.errorMessage);
    }
  };
  console.log("img", imgFile);

  const navigate = useNavigate();

  const handleCancel = () => {
    setImgFile(null);
    navigate("/mypage");
  };

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
            onChange={saveFile}
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
      <StButtonBox>
        <StCancelBtn type="submit" onClick={handleCancel}>
          취소
        </StCancelBtn>
        <StSaveBtn type="submit" onClick={saveFile}>
          저장
        </StSaveBtn>
      </StButtonBox>
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
  border: 1px solid #d9d9d9;

  -webkit-box-shadow: 0px 0px 8px 1px rgba(217, 217, 217, 1);
  -moz-box-shadow: 0px 0px 8px 1px rgba(217, 217, 217, 1);
  box-shadow: 0px 0px 8px 1px rgba(217, 217, 217, 1);
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

const StButtonBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px auto;
`;
const StCancelBtn = styled.button`
  width: 130px;
  height: 52px;
  padding: 16px 40xp;
  color: #a2acbd;
  border: none;
  font-size: 22px;
  background-color: #fff;
`;
const StSaveBtn = styled.button`
  width: 130px;
  height: 52px;
  padding: 16px 40xp;
  font-size: 22px;
  color: #fff;
  border: none;
  border-radius: 40px;

  background-color: #30a2ff;
`;
export default Profile;
