"use client";
import { Chess } from "chess.js";
import Board from "@/components/game/Board";
import { useCallback, useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useStockfish } from "@/utils/engine";

const Analysis = () => {
  const [game, setGame] = useState(new Chess());
  const [arrows, setArrows] = useState([]);
  const [side, setSide] = useState("white");
  const [loading, setLoading] = useState(false);
  const { stockfish, sendCommand, loadEngine } = useStockfish();
  const [bestMove, setBestMove] = useState("");
  const [evaluation, setEvaluation] = useState(null);
  const [engineLoaded, setEngineLoaded] = useState(false);

  useEffect(() => {
    if (stockfish) {
      stockfish.onmessage = (event) => {
        const message = event.data;
        if (message.startsWith("bestmove")) {
          const bestMove = message.split(" ")[1];
          const from = bestMove.slice(0, 2);
          const to = bestMove.slice(2);
          setBestMove(message.split(" ")[1]);
          setArrows([[from, to, "green"]]);
          setLoading(false);
        } else if (message.includes("score cp")) {
          const match = message.match(/score cp (-?\d+)/);
          if (match) {
            let evalu = parseInt(match[1]) / 100;
            if (game.turn() === "b") {
              evalu = -evalu;
            }
            setEvaluation(evalu);
          }
        }
      };

      // Initialize Stockfish
      sendCommand("uci");
      sendCommand("isready");

      // Start analysis immediately after engine is loaded
      getBestMove();
    }
  }, [stockfish, sendCommand]);

  const getBestMove = useCallback(() => {
    if (!stockfish) return;
    setArrows([]);
    setLoading(true);
    sendCommand(`position fen ${game.fen()}`);
    sendCommand("go depth 15");
  }, [game, sendCommand, stockfish]);

  const handleLoadEngine = () => {
    loadEngine();
    setEngineLoaded(true);
  };

  const CustomComponent = () => {
    return (
      <div className="w-full h-full py-4">
        {!engineLoaded ? (
          <button
            onClick={handleLoadEngine}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Load Engine
          </button>
        ) : (
          <>
            <div className="loader h-14">
              {loading ? (
                <div className="flex gap-4">
                  <p>Calculating Best Move</p>
                  <FaSpinner size={30} className="animate-spin" />
                </div>
              ) : (
                <div>
                  <p>Best move: {bestMove}</p>
                  <p>
                    Evaluation:{" "}
                    {evaluation !== null ? evaluation.toFixed(2) : "N/A"}
                  </p>
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
              <div className="mt-4">
                <button
                  className="px-4 p-2 bg-yellow-500 hover;bg-yellow-600 text-black rounded-md font-semibold"
                  onClick={() => {
                    setGame(new Chess());
                    setArrows([]);
                    setEvaluation(0);
                    setBestMove("e2e4");
                  }}
                >
                  Reset Board
                </button>
              </div>
            </div>
          </>
        )}
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
        showEvalBar={true}
        evaluation={evaluation}
        allowMoveOpponentPieces={true}
      />
    </div>
  );
};

export default Analysis;
