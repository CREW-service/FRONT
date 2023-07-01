import axios from "axios";

// 싱글톤 패턴으로 axios 인스터스를 생성
const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_SERVER_URL,
  headers: {
    withCredentials: true,
  },
});


// api.interceptors.request.use(
//   config => {
//     const token = localStorage.getItem("coopToken");
//     if (token) {
//       // config.headers["authorization"] = `Bearer ${token}`;
//       return config;
//     }
//     return config;
//   },
//   error => 
//    error
//   ,
// );

// axios 인터셉터 활용해서 작업하면  반복되는 헤더 입력 부분을 개선해 볼 수 있다. 

const AuthApi = {
  getCurrentUser: (config) => api.get("/currentuser", { ...config }),

  write: (payload, config) => api.post("/boat/write", payload, { ...config }),

  getBoatList: () => api.get("/boat/map"),

  getBoatDetail: (payload, config) =>
    api.get(`/boat/${payload}`, { ...config }),

  joinBoat: (payload, config) =>
    api.post(`/boat/${payload}/join`, 1, { ...config }),

  correctionBoat: (payload, config) =>
    api.put(`/boat/${payload}`, payload, { ...config }),

  deleteBoat: (boatId, payload, config) =>
    api.patch(`/boat/${boatId}/delete`, payload, { ...config }),

  comment: (boatId, payload, config) =>
    api.post(`/boat/${boatId}/comment`, payload, { ...config }),

  deleteComment: (boatId, commentId, payload, config) =>
    api.patch(`/boat/${boatId}/comment/${commentId}`, payload, { ...config }),

  getMyInfo: (config) => api.get("/mypage", { ...config }),

  getalarm: (config) => api.get("/alarm", { ...config }),

  releaseCrew: (boatId, payload, config) =>
    api.post(`/boat/${boatId}/release`, payload, { ...config }),

  closeBoat: (boatId, payload, config) =>
    api.patch(`/boat/${boatId}`, payload, { ...config }),

  correctionWrite: (boatId, payload, config) =>
    api.put(`/boat/${boatId}`, payload, { ...config }),

  alarmRead: (alarmId, config) =>
    api.put(`/alarm/${alarmId}`, 1, { ...config }),

  correctionComment: (boatId, commentId, payload, config) =>
    api.put(`/boat/${boatId}/comment/${commentId}`, payload, { ...config }),
    
    logOut: () => api.get("/auth/logout")
};

export default AuthApi;
