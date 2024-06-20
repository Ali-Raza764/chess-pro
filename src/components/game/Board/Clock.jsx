import React, { useState, useEffect } from "react";

const Clock = ({ initialTime, isPaused, setGameover }) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    let timer;
    if (time === 0) {
      setGameover(true);
    }
    if (!isPaused && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => Math.max(prevTime - 1, 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPaused, time]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg border-gray-500 border-opacity-30 shadow-lg p-2 flex items-center justify-center border-2 w-24">
      <span className="text-xl font-bold text-gray-200">{formatTime(time)}</span>
    </div>
  );
};

export default Clock;
