import axios from "axios";

// 싱글톤 패턴으로 axios 인스터스를 생성
const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_SERVER_URL,
  headers: {
    withCredentials: true,
  },
});

const AuthApi = {
  write: (payload, config) => api.post("/boat/write", payload, { ...config }),
  getBoatList: () => api.get("/boat/map"),
  getBoatDetail: (payload, config) =>
    api.get(`/boat/${payload}`, { ...config }),
  joinBoat: (payload, config) =>
    api.post(`/boat/${payload}/join`, 1, { ...config }),
  correctionBoatDetail: (payload, config) =>
    api.put(`/boat/${payload}`, payload, { ...config }),
  comment: (boatId, payload, config) =>
    api.post(`/boat/${boatId}/comment`, payload, { ...config }),
};

export default AuthApi;
