import { io } from "socket.io-client";

const socket = io("http://localhost:3001"); // Connect to mock backend

export default socket;
