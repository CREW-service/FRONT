import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import Login from 'Components/feature/Kakaologin/Kakaologin';

function Home() {
  const [cookie, setCookie, removeCookie] = useCookies(['authorization']);

  const navigate = useNavigate();
  useEffect(() => {
    // 현재 URL에서 쿼리 파라미터 추출
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      localStorage.setItem('authorization', JSON.stringify(`Bearer ${token}`));
      setCookie('authorization', `Bearer ${token}`);
      navigate('/');
    }
    // 추출한 토큰을 로컬 스토리지에 저장
  }, [navigate]);

  return (
    <>
      <div>Home</div>
      <Login />
    </>
  );
}

export default Home;
