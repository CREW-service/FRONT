import React from "react";
import io from "socket.io-client";
import { useDispatch } from "react-redux";
import { socketStorage } from "../redux/action";

function Chatlist() {
  const dispatch = useDispatch();
  const socket = io.connect(process.env.REACT_APP_SOCKET_URL);
  dispatch(socketStorage(socket));
  return <div>Chatlist</div>;
}

export default Chatlist;
