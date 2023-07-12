import io from "socket.io-client";

function useSocket() {
  // authorization 쿠키의 값을 가져옴
  const getAuthorizationCookieValue = () => {
    const name = "authorization=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");

    for (let i = 0; i < cookieArray.length; i += 1) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return null;
  };

  const socket = io(process.env.REACT_APP_BACKEND_SERVER_URL, {
    withCredentials: true,
    extraHeaders: {
      authorization: getAuthorizationCookieValue() || "",
    },
  });
  return socket
}

export default useSocket;
