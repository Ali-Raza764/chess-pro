import OverViews from "@/components/other/OverViews";
import Puzzles from "@/components/other/Puzzles";
import Hero from "@/components/other/Hero";
import React from "react";

const Home = () => {
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center">
        <Hero />
      </div>
      <div className="min-h-screen pt-6 p-5 ">
        <h2 className="font-bold text-3xl text-white bg-gray-900 text-left">
          SOLVE PUZZLES
        </h2>
        <Puzzles />
      </div>
      <div className="min-h-screen pt-6 p-5">
        <h2 className="font-bold text-3xl text-white bg-gray-900 text-left">Active Community</h2>
        <OverViews />
      </div>
    </div>
  );
};

export default Home;
