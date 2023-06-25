import axios from "axios";

// 싱글톤 패턴으로 axios 인스터스를 생성
const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_SERVER_URL,
  headers: {
    withCredentials: true,
  },
});

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
};

export default AuthApi;
