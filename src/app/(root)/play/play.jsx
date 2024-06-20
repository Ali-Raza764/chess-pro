"use client";
import React, { useEffect, useState } from "react";

import { socket } from "@/utils/socket/socket";
import { FaClipboard } from "react-icons/fa";
import Board from "@/components/game/Board";

const Play = ({ roomId, timeSesonds }) => {
  const [players, setPlayers] = useState([]);
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [rematch, setRematch] = useState(false);

  useEffect(() => {
    socket.emit("create_room", roomId, "Guest", (response) => {
      if (response.success) {
        setData(response);
      } else {
        setError(response.message);
      }
    });

    socket.on("sendrematch", () => {
      setRematch(!rematch);
    });

    socket.emit("getUsers", roomId, (response) => {
      if (response.success) {
        setPlayers(response.players);
      } else {
        console.error("Failed to fetch users:", response.message);
      }
    });

    socket.on("userconnected", (response) => {
      setPlayers(response.players);
    });

    return () => {
      socket.off("userconnected");
      socket.off("makemove");
    };
  }, [roomId]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).catch((err) => {
      console.error("Failed to copy text: ", err);
    });
  };

  if (players.length < 2) {
    return (
      <div className="min-h-screen w-full">
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
  }

  return (
    <div className="min-h-screen w-full lg:px-6 py-3">
      {error === "" ? (
        <Board
          side={data?.side}
          roomId={data?.roomId}
          players={players}
          key={data?.roomId + data?.side + rematch}
          time={timeSesonds}
        />
      ) : (
        <div className="h-full w-full flex items-center justify-center">
          {error}
        </div>
      )}
    </div>
  );
};

export default Play;
