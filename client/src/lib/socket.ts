import { io } from "socket.io-client";

const SERVER = process.env.NEXT_PUBLIC_SERVER || "http://localhost:3333";

export const socket = io(SERVER, {
  transports: ['websocket', 'polling', 'flashsocket'],
});
