import React from "react";
import { socket } from "@/utils/socket/socket";


const RematchButton = ({ roomId }) => {
  const handleRematch = () => {
    socket.emit("rematch", roomId);
  };
  return (
    <button
      onClick={handleRematch}
      className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700  h-32 w-32 border shadowtransition  text-lg font-semibold"
    >
      Rematch
    </button>
  );
};

export default RematchButton;
