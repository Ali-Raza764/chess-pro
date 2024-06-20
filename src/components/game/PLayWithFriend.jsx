"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { MdClose } from "react-icons/md";

const PLayWithFriend = ({ timeFormats }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleClick = async () => {
    if (!selectedTime) {
      setError("Please Choose a Time Format");
      return;
    }
    setError("");
    const roomId =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    router.push(`/play?roomId=${roomId}&time=${selectedTime}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSelectedTime(e.target.time.value);
  };
  return (
    <>
      <button
        className="px-4 p-2 border rounded-md"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        Play With a Friend
      </button>
      <div
        className={`modal z-50 fixed top-0 left-0 right-0 bottom-0 w-screen h-screen ${
          isOpen ? "flex" : "hidden"
        } items-center justify-center transition bg-white bg-opacity-20 backdrop-blur-md`}
      >
        <button>
          <MdClose
            size={35}
            className="absolute top-0 right-0 m-4 cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        </button>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 w-max h-max"
        >
          <div className="flex flex-col">
            <label htmlFor="time" className="font-semibold text-3xl mb-4">
              Time
            </label>
            <p className="text-lg text-red-500">{error}</p>
            <div className="grid grid-cols-3 gap-3 my-2">
              {timeFormats?.map((format) => (
                <div
                  className={`h-14 p-2 rounded-md border flex gap-3 items-center cursor-pointer hover:bg-gray-600 transition ${
                    format.seconds === selectedTime && "bg-gray-600"
                  }`}
                  key={format.id}
                  onClick={() => {
                    setSelectedTime(format.seconds);
                  }}
                >
                  <span>{format.seconds / 60}</span> minutes
                </div>
              ))}
            </div>
            <div className="my-3">Or</div>
            <input
              type="number"
              name="time"
              id="time"
              className="border-2 border-white rounded-md outline-none p-2 mt-1 w-full text-black placeholder:text-black"
              placeholder="Enter Time in Seconds"
              required
            />
          </div>
          <button
            className="px-4 p-2 text-white border rounded-md"
            onClick={handleClick}
          >
            Create a Game
          </button>
        </form>
      </div>
    </>
  );
};

export default PLayWithFriend;
