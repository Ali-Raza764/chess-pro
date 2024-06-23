"use client";
import { Chess } from "chess.js";
import Board from "./Board";
import { useCallback, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import fetchBestMove from "@/utils/engine/bestmove";

const Analysis = () => {
  const [game, setGame] = useState(new Chess());
  const [arrows, setArrows] = useState([["e2", "e4", "green"]]);
  const [side, setSide] = useState("white");
  const [loading, setLoading] = useState(false);
  
  const getBestMove = useCallback(async () => {
    setArrows([]);
    setLoading(true);
    const res = await fetchBestMove(game.fen());
    const move = res.bestmove;
    setLoading(false);
    setArrows([[move.slice(0, 2), move.slice(2), "green"]]);
  }, []);

  const CustomComponent = () => {
    return (
      <div className="w-full h-full py-4">
        <div className="loader h-14">
          {loading && (
            <div className="flex gap-4">
              <p>Calculating Best Move</p>
              <FaSpinner size={30} className="animate-spin" />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="side" className="font-semibold text-xl">
            Side
          </label>
          <select
            name="side"
            id="side"
            className="p-1 border bg-gray-800"
            onChange={(e) => {
              setSide(e.target.value);
            }}
          >
            <option value="white">White</option>
            <option value="black">Black</option>
          </select>
        </div>
      </div>
    );
  };
  return (
    <div className="h-full w-full">
      <Board
        game={game}
        customArrows={arrows}
        afterMove={getBestMove}
        boardOrientation={side}
        customComponent={true}
        renderCustomComponent={CustomComponent}
      />
    </div>
  );
};

export default Analysis;
