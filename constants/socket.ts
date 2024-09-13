import { io } from "socket.io-client";
import { API_URL } from ".";

const socket = io(API_URL, {
  transports: ["websocket"],
});

export default socket;
