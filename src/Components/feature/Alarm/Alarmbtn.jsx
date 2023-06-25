import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import AuthApi from "shared/api";

function Alarmbtn() {
  const [alarms, setAlarms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cookies] = useCookies(["authorization"]);

  const getAlarms = async () => {
    try {
      const config = {
        headers: {
          authorization: cookies.authorization,
        },
      };
      const { data } = await AuthApi.getalarm(config);
      console.log("alarmdata", data);
      setAlarms(data);
      setIsLoading(false);
    } catch (err) {
      console.log("alarmerr", err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAlarms();
  }, []);

  const alarmBtnHandler = () => {
    getAlarms();
  };
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <button type="button" onClick={alarmBtnHandler}>
          알림
        </button>
      )}
    </div>
  );
}

export default Alarmbtn;
