import React, { useState, useRef } from "react";
import Resizer from "react-image-file-resizer";
import styled from "styled-components";
import defualtpic from "imgs/defualtpic.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import Profileimg from "imgs/profile_photo_edit.png";
import AuthApi from "shared/api";

function Profile() {
  const location = useLocation();
  const { user } = location.state;
  const imageInput = useRef();
  const [profileData, setProfileData] = useState({
    imgFile: user.profileImage,
    uploadImage: null,
    nickName: user.nickName,
    myMessage: user.myMessage,
  });

  const { imgFile, uploadImage, nickName, myMessage } = profileData;
  const navigate = useNavigate();

  const onCickImageUpload = () => {
    imageInput.current.click();
  };

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(file, 500, 500, "JPEG", 100, 0, (uri) => {
        resolve(uri);
      });
    });

  const saveImgFile = async (e) => {
    const file = await e.target.files[0];
    // 파일 형식이 지원되는지 확인합니다. (JPEG, PNG, 또는 WEBP)
    const supportedFormats = ["image/jpeg", "image/png", "image/webp"];
    if (!supportedFormats.includes(file.type)) {
      alert(
        "지원되지 않는 이미지 형식입니다. JPEG, PNG 또는 WEBP 형식의 이미지를 업로드해주세요."
      );
      return;
    }

    try {
      const compressedFile = await resizeFile(file);
      // 압축된 이미지를 서버에 업로드하거나 사용할 수 있습니다.

      // imgFile이 이미지 파일인 경우에만 createObjectURL 함수를 사용합니다.
      if (imgFile instanceof File || imgFile instanceof Blob) {
        URL.revokeObjectURL(imgFile); // 기존에 생성한 URL을 해제합니다.
      }

      setProfileData((prevData) => ({
        ...prevData,
        imgFile: compressedFile,
        uploadImage: compressedFile,
      }));
    } catch (error) {
      console.error("이미지 리사이징 및 압축 중 오류가 발생했습니다:", error);
      // 오류를 적절하게 처리합니다. (예: 사용자에게 오류 메시지를 표시)
    }
  };

  const handleNickChange = (e) => {
    setProfileData((prevData) => ({
      ...prevData,
      nickName: e.target.value,
    }));
  };

  const handleMyMessageChange = (e) => {
    setProfileData((prevData) => ({
      ...prevData,
      myMessage: e.target.value,
    }));
  };

  const onSubmitHandler = async () => {
    const formData = new FormData();

    formData.append("image", uploadImage);
    formData.append("nickName", nickName);
    formData.append("myMessage", myMessage);

    try {
      const res = await AuthApi.myPageEdit(formData);
      alert(res.data.message);
      navigate("/mypage");
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
        <StCancelBtn type="button" onClick={() => navigate("/mypage")}>
          취소
        </StCancelBtn>
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
