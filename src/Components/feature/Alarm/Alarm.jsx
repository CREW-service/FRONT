// import React, { useState } from "react";
// import AuthApi from "shared/api";

// function Alarm() {
//   const [alarm, setAlarm] = useState("");
//   const fetchAlarm = async () => {
//     try {
//       const { data } = await AuthApi.get();
//       setAlarm(data);
//       setIsLoading(false);
//     } catch (error) {
//       cconsole.error("Error fetching post:", error);
//       setIsLoading(false);
//     }
//   };
//   useEffect(() => {
//     fetchAlarm();
//   }, []);
//   return (
//     <div>
//       {isLoading ? (
//         <div>Loading...</div>
//       ) : (
//         <>
//           <div>{alarm}</div>
//           <div>{alarm}</div>
//           <div>{alarm}</div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Alarm;
