"use client";
import { Chess } from "chess.js";
import Board from "@/app/(root)/analysis/Board";
import { useCallback, useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import SideSelectionDialog from "@/components/reuseable/SideSelection";
import fetchBestMove from "@/utils/engine/bestmove";

const Analysis = () => {
  const [game, setGame] = useState(new Chess());
  const [side, setSide] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNewGame = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (side === "black") {
      getBestMove();
    }
  }, [side]);

  const getBestMove = useCallback(async () => {
    setLoading(true);
    const res = await fetchBestMove(game.fen());
    const move = res.bestmove;
    const from = move.slice(0, 2);
    const to = move.slice(2);
    game.move({
      from,
      to,
      promotion: "q",
    });
    setLoading(false);
  }, []);

  const handleSetSide = (selectedSide) => {
    setSide(selectedSide);
  };

  const CustomComponent = () => {
    return (
      <div className="w-full h-full py-4">
        <div className="loader h-14">
          {loading && (
            <div className="flex gap-4">
              <p>Thnking</p>
              <FaSpinner size={30} className="animate-spin" />
            </div>
          )}
        </div>
        <div className="buttons">
          <button
            className="px-4 p-2 rounded-md bg-yellow-500"
            onClick={handleNewGame}
          >
            New Game
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full w-full">
      {side === "" ? (
        <SideSelectionDialog setSide={handleSetSide} />
      ) : (
        <Board
          key={side}
          game={game}
          afterMove={getBestMove}
          boardOrientation={side}
          customComponent={true}
          renderCustomComponent={CustomComponent}
        />
      )}
    </div>
  );
};

export default Analysis;
