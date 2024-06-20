import React from "react";
import gameFormats from "./gameFormats";
import CreateGame from "@/components/game/CreateGame";
import PLayWithFriend from "@/components/game/PLayWithFriend";

const Home = () => {
  return (
    <div className="w-full min-h-screen p-5">
      <h1 className="text-left text-3xl font-bold">Play Now</h1>
      <section className="w-full flex gap-6 items-center justify-center flex-wrap mt-24">
        {gameFormats.map((format) => {
          return (
            <CreateGame
              name={format.type}
              seconds={format.seconds}
              key={format.id}
            />
          );
        })}
      </section>
      <div className="or w-full p-3 flex items-center justify-center my-7">Or</div>
      <section className="w-full p-3 flex items-center justify-center">
        <PLayWithFriend timeFormats={gameFormats} />
      </section>
    </div>
  );
};

export default Home;
