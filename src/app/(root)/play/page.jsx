import React from "react";
import Play from "./play";
import { redirect } from "next/navigation";

const page = ({ searchParams }) => {
  const roomId = searchParams.roomId;
  const time = searchParams.time;
  if(!roomId || !time ||roomId===undefined || time===undefined){
    redirect("/home")
  }
  return <Play roomId={roomId} timeSesonds={time} />;
};

export default page;