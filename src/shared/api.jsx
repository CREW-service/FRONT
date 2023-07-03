import axios from "axios";

// 싱글톤 패턴으로 axios 인스터스를 생성
const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_SERVER_URL,
  headers: {
    withCredentials: true,
  },
});

api.interceptors.request.use(
  (config) => {
    const cookies = document.cookie.split("=")[1].split("%20").join(" ");

    if (cookies) {
      const copyConfig = { ...config };
      copyConfig.headers.authorization = cookies;
      return copyConfig;
    }
    return config;
  },
  (error) => error
);

// axios 인터셉터 활용해서 작업하면  반복되는 헤더 입력 부분을 개선해 볼 수 있다.

const AuthApi = {
  getCurrentUser: () => api.get("/currentuser"),

  write: (payload) => api.post("/boat/write", payload),

  getBoatList: () => api.get("/boat/map"),

  getBoatDetail: (payload) => api.get(`/boat/${payload}`),

  joinBoat: (payload) => api.post(`/boat/${payload}/join`, 1),

  correctionBoat: (payload) => api.put(`/boat/${payload}`, payload),

  deleteBoat: (boatId, payload) => api.patch(`/boat/${boatId}/delete`, payload),

  comment: (boatId, payload) => api.post(`/boat/${boatId}/comment`, payload),

  deleteComment: (boatId, commentId, payload) =>
    api.patch(`/boat/${boatId}/comment/${commentId}`, payload),

  getMyInfo: () => api.get("/mypage"),

  getalarm: () => api.get("/alarm"),

  releaseCrew: (boatId, payload) =>
    api.post(`/boat/${boatId}/release`, payload),

  closeBoat: (boatId, payload) => api.patch(`/boat/${boatId}`, payload),

  correctionWrite: (boatId, payload) => api.put(`/boat/${boatId}`, payload),

  alarmRead: (alarmId) => api.put(`/alarm/${alarmId}`, 1),

  correctionComment: (boatId, commentId, payload) =>
    api.put(`/boat/${boatId}/comment/${commentId}`, payload),

  logOut: () => api.get("/auth/logout"),
};

export default AuthApi;
