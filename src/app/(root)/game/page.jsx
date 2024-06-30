import React from "react";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
const Play = dynamic(() => import("./Play"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const page = ({ searchParams }) => {
  const roomId = searchParams.roomId;
  const time = searchParams.time;
  const type = searchParams.type;

  if (!roomId || !time || roomId === undefined || time === undefined) {
    redirect("/home");
  }
  return <Play roomId={roomId} timeSesonds={time} type={type} key={roomId} />;
};

export default page;
