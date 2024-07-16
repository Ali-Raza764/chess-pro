import { io } from "socket.io-client";

let URL;

if (process.env.NODE_ENV === "development") {

  URL = "http://localhost:3000";

} else if (process.env.NODE_ENV === "production") {

  URL = process.env.NEXT_PUBLIC_SERVER_URL;
  
}

export const socket = io(URL);
