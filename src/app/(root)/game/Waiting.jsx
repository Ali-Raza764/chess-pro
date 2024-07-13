import React from "react";
import { FaClipboard } from "react-icons/fa";

const Waiting = () => {
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).catch((err) => {
          console.error("Failed to copy text: ", err);
        });
      };
    
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="h-[25rem] w-[25rem] flex items-center justify-center flex-col gap-4">
        <p className="text-lg font-medium">
          Waiting fot Other Player To Join the game
        </p>
        <button
          className="border shadow rounded-md p-2 bg-gray-900 hover:bg-gray-800 transition text-white text-lg font-semibold flex items-center justify-center gap-6"
          onClick={() => copyToClipboard(window.location.href)}
        >
          Copy Game Link
          <FaClipboard />
        </button>
      </div>
    </div>
  );
};

export default Waiting;
