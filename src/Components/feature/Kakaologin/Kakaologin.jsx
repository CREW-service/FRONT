import React from 'react';
import KakaoBtn from './kakao_login_medium_narrow.png';

function Kakaologin() {
  const loginUrl = `${process.env.REACT_APP_BACKEND_SERVER_URL}/auth/kakao`;
  return (
    <div>
      <a href={loginUrl}>
        <img src={KakaoBtn} alt='kakao login button' />
      </a>
    </div>
  );
}

export default Kakaologin;
