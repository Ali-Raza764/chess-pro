"use client";
import { Chess } from "chess.js";
import Board from "@/components/game/Board";
import { useCallback, useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import SideSelectionDialog from "@/components/reuseable/SideSelection";
import { useStockfish } from "@/utils/engine";

const Analysis = () => {
  const [game, setGame] = useState(new Chess());
  const [side, setSide] = useState("");
  const [loading, setLoading] = useState(false);
  const { stockfish, sendCommand, loadEngine } = useStockfish();
  const [engineLoaded, setEngineLoaded] = useState(false);

  const handleLoadEngine = () => {
    loadEngine();
    setEngineLoaded(true);
  };

  const handleNewGame = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (stockfish) {
      stockfish.onmessage = (event) => {
        const message = event.data;
        if (message.startsWith("bestmove")) {
          const bestMove = message.split(" ")[1];
          const from = bestMove.slice(0, 2);
          const to = bestMove.slice(2);
          game.move({
            from,
            to,
          });
          setLoading(false);
        }
      };
    }

    if (side === "black") {
      getBestMove();
    }

    // Initialize Stockfish
    sendCommand("uci");
    sendCommand("isready");
  }, [side, stockfish, sendCommand]);

  const getBestMove = useCallback(
    async (recievedMove) => {
      setLoading(true);
      if (!stockfish) return;
      sendCommand(`position fen ${game.fen()}`);
      sendCommand("go depth 15");
    },
    [game, sendCommand, stockfish]
  );

  const handleSetSide = (selectedSide) => {
    setSide(selectedSide);
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
          </>
        )}
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
          allowMoveOpponentPieces={false}
        />
      )}
    </div>
  );
};

export default Analysis;
