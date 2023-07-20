import React, { useState, useRef } from "react";
import styled from "styled-components";
import defualtpic from "imgs/defualtpic.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import Profileimg from "imgs/profile_photo_edit.png";
import AuthApi from "shared/api";

function Profile() {
  const [uploadImage, setUploadImage] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const location = useLocation();
  const { user } = location.state;
  const imageInput = useRef();

  const [nickName, setNickName] = useState(user.nickName);
  const [myMessage, setMyMessage] = useState(user.myMessage);

  const navigate = useNavigate()

  const onCickImageUpload = () => {
    imageInput.current.click();
  };

  const saveImgFile = async (e) => {
    const blob = await e.target.files[0];
    setImgFile(URL.createObjectURL(blob));

    setUploadImage(blob);
  };

  const handleNickChange = (e) => {
    setNickName(e.target.value);
  };

  const handleMyMessageChange = (e) => {
    setMyMessage(e.target.value);
  };

  const onSubmitHandler = async () => {
    const formData = new FormData();
    formData.append("image", uploadImage);
    formData.append("nickName", nickName);
    formData.append("myMessage", myMessage);
    try {
      const res = await AuthApi.myPageEdit(formData);
      alert(res.data.message);
      navigate("/mypage")
    } catch (err) {
      alert(err.response.data.errorMessage);
    }
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
          <StNicText value={nickName} onChange={handleNickChange} />
        </StNicBox>
        <div>
          <StMessageTitle>상태메세지</StMessageTitle>
          <StMyMessage value={myMessage} onChange={handleMyMessageChange} />
        </div>
      </StNicMessageBox>
      <StButtonBox>
        <StCancelBtn type="button" onClick={()=>navigate("/mypage")}>취소</StCancelBtn>
        <StSaveBtn type="submit" onClick={onSubmitHandler}>
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

const StButtonBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
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
