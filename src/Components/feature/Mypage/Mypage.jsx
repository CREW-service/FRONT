import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import AuthApi from "shared/api";

function Mypage() {
  const [myInfo, setMyInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cookies] = useCookies(["authorization"]);

  const getMyinfo = async () => {
    try {
      const config = {
        headers: {
          authorization: cookies.authorization,
        },
      };
      const { data } = await AuthApi.getMyInfo(config);
      console.log(data);
      setMyInfo(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching post:", error);
      setIsLoading(false);
    }
  };

  useEffect(()=>{
    getMyinfo()
  },[])

  return <div>{isLoading ? <div>Loading...</div> : null}</div>;
}

export default Mypage;
