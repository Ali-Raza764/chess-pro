"use client";
import React, { useEffect, useState } from "react";
import { RxLightningBolt } from "react-icons/rx";
import { FaClock, FaSpinner } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa";
import { socket } from "@/utils/socket/socket";
import { useRouter } from "next/navigation";

const CreateGame = ({ name, seconds }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("game_found", (data) => {
      setLoading(false);
      router.push(`/play?roomId=${data.roomId}&time=${data.seconds}`);
    });

    return () => {
      socket.off("game_found");
    };
  }, []);

  const handleClick = () => {
    //* The matching socket will call the game_found socket in the useEffect
    setLoading(true);
    socket.emit(
      "matching_queue",
      { id: socket.id, seconds: seconds },
      (response) => {
        response.success && setMessage(response.message);
      }
    );
  };

  // Determine which icon to display based on the game type (name)
  const renderIcon = () => {
    switch (name) {
      case "blitz":
        return <RxLightningBolt className="w-8 h-8" />;
      case "rapid":
        return <FaClock className="w-8 h-8" />;
      case "classical":
        return <FaGraduationCap className="w-8 h-8" />;
      default:
        return null;
    }
  };

  return (
    <button
      className="h-32 w-32 border shadow rounded-md p-2 bg-gray-900 hover:bg-gray-800 transition text-white text-lg font-semibold flex flex-col items-center justify-center gap-6"
      onClick={handleClick}
      style={{ backdropFilter: "brightness(0.8) saturate(120%)", zIndex: 10 }}
    >
      <span className="flex items-center gap-3 text-xl">
        {!loading ? (
          renderIcon()
        ) : (
          <FaSpinner size={30} className="animate-spin" />
        )}{" "}
        {/* Display the appropriate icon */}
        {name}
      </span>
      <span className="text-4xl font-bold w-full flex gap-3 items-center justify-center">
        {seconds / 60}+
      </span>
    </button>
  );
};

export default CreateGame;
