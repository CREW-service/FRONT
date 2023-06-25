import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import AuthApi from "shared/api";

function Alarmdropdown() {
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

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {alarms.alarms.map((alarm) => (
            <div key={alarm.id}>
              <span>{alarm.message}</span>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Alarmdropdown;
