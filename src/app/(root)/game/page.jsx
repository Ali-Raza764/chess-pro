import { redirect } from "next/navigation";
import Play from "./Play";

const GamePage = ({ searchParams }) => {
  const roomId = searchParams.roomId;
  const time = searchParams.time;
  const type = searchParams.type;

  if (!roomId || !time || roomId === undefined || time === undefined) {
    redirect("/home");
  }
  return <Play roomId={roomId} timeSesonds={time} type={type} key={roomId} />;
};

export default GamePage;
