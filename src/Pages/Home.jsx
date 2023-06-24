import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Boatlist from "Components/feature/Boatlist/Boatlist";
import Layout from "Components/Layout/Layout";
import Kakaologin from "Components/feature/Kakaologin/Kakaologin";
import AuthApi from "shared/api";
import { currentUserIdAtom } from "Recoil/recoilAtoms";
import { useRecoilState } from "recoil";

function Home() {
  const [cookies, setCookie, removeCookie] = useCookies(["authorization"]);
  const [currentUserId, setCurrentUserId] = useRecoilState(currentUserIdAtom);
  console.log("userid", currentUserId);
  const getUserInfo = async () => {
    try {
      const config = {
        headers: {
          // 쿠키를 헤더에 추가
          authorization: cookies.authorization,
        },
      };

      const res = await AuthApi.getCurrentUser(config);
      // console.log(res);
      // localStorage.setItem("userId", JSON.stringify(`${res.data.userId}`));
      setCurrentUserId(res.data.userId);
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    // 현재 URL에서 쿼리 파라미터 추출
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      // localStorage.setItem("authorization", JSON.stringify(`Bearer ${token}`));

      setCookie("authorization", `Bearer ${token}`);
      getUserInfo();
      navigate("/");
    }
    // 추출한 토큰을 로컬 스토리지에 저장
  }, [navigate]);

  return (
    <Layout>
      {/* <Kakaologin /> */}
      <Boatlist />
    </Layout>
  );
}

export default Home;
