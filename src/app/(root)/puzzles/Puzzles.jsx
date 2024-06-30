"use client";
import { Chess } from "chess.js";
import { useCallback, useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import useSound from "@/utils/hooks/useSound"; // Import the custom hook

const Puzzles = ({ puzzles }) => {
  const [game, setGame] = useState(new Chess());
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [position, setPosition] = useState("");
  const [moveNumber, setMoveNumber] = useState(0);
  const [message, setMessage] = useState("");
  const [invalidMove, setInvalidMove] = useState(false);
  const [puzzleEnd, setPuzzleEnd] = useState(false);
  const [side, setSide] = useState("white");
  const [puzzlesCompleted, setPuzzlesCompleted] = useState(0);
  const { currentSound, handleSound } = useSound(game); // Use the custom hook

  const Chooseside = useCallback(() => {
    if (puzzles[currentPuzzle]) {
      const fenParts = puzzles[currentPuzzle].FEN.split(" ");
      const sideToMove = fenParts[1];
      setSide(sideToMove === "w" ? "black" : "white");
    }
  }, [currentPuzzle, puzzles]);

  useEffect(() => {
    if (puzzles[currentPuzzle]) {
      const newGame = new Chess(puzzles[currentPuzzle].FEN);
      setGame(newGame);
      Chooseside();
      setPosition(newGame.fen());

      // Make the first move
      const firstMove = puzzles[currentPuzzle].Moves.split(" ")[0];
      setTimeout(() => {
        const from = firstMove.slice(0, 2);
        const to = firstMove.slice(2);
        const move = newGame.move({ from, to, promotion: "q" });
        handleSound(move);
        setGame(newGame);
        setPosition(newGame.fen());
        setMoveNumber(1);
      }, 1000);
    }
  }, [currentPuzzle, puzzles, Chooseside]);

  const verifyMove = (move) => {
    const moves = puzzles[currentPuzzle]?.Moves.split(" ") || [];
    if (move === moves[moveNumber]) {
      if (moveNumber + 1 < moves.length) {
        const nextMove = moves[moveNumber + 1];
        // Return true immediately, but schedule the next move
        setTimeout(() => {
          const newGame = new Chess(game.fen());
          const move = newGame.move({
            from: nextMove.slice(0, 2),
            to: nextMove.slice(2),
            promotion: "q",
          });
          handleSound(move);
          setGame(newGame);
          setPosition(newGame.fen());
          setMoveNumber(moveNumber + 2);
        }, 500);
      } else {
        setPuzzleEnd(true);
        setMessage("Puzzle completed");
      }
      return true;
    }
    return false;
  };

  const handleDrop = (sourceSquare, targetSquare, piece) => {
    // Stop user from moving opponent pieces
    if (game.turn()[0] !== piece[0]) return false;

    const move = sourceSquare + targetSquare;

    try {
      const mademove = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });
      handleSound(mademove);
      if (!verifyMove(move)) {
        setMessage("Invalid move");
        setInvalidMove(true);
      }
      setPosition(game.fen());
      setMoveNumber(moveNumber + 2);
      return true;
    } catch (error) {
      return false;
    }
  };

  if (!puzzles || puzzles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold mb-4">No puzzles available</h1>
      </div>
    );
  }

  if (puzzlesCompleted === puzzles.length) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold mb-4">
          Congratulations, you have completed all the puzzles
        </h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setPuzzlesCompleted(0);
            setCurrentPuzzle(0);
          }}
        >
          Start Over
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full p-4 flex justify-between">
      <audio autoPlay src={currentSound} />
      <div className="sticky h-full w-full">
        <Chessboard
          position={position}
          boardOrientation={side}
          boardWidth={500}
          onPieceDrop={handleDrop}
        />
      </div>
      <div className="w-full">
        <div className="w-full p-6 text-xl font-semibold font-sans">
          {message && <p>{message}</p>}
        </div>

        <div className="w-full p-6">
          {invalidMove && (
            <button
              onClick={() => {
                setInvalidMove(false);
                setMessage("");
                game.undo();
                setPosition(game.fen());
                setMoveNumber(moveNumber - 2);
              }}
              className="px-4 p-2 text-md font-semibold text-white bg-red-500 rounded-md"
            >
              Try again
            </button>
          )}
        </div>
        <div className="w-full p-6">
          {puzzleEnd && (
            <button
              onClick={() => {
                setCurrentPuzzle(currentPuzzle + 1);
                setPuzzleEnd(false);
                setMessage("");
                setInvalidMove(false);
                setPuzzlesCompleted(puzzlesCompleted + 1);
                Chooseside();
              }}
              className="px-4 p-2 text-md font-semibold text-white bg-green-500 rounded-md"
            >
              Next Puzzle
            </button>
          )}
        </div>
        <div className="w-full p-6 text-xl font-semibold font-sans">
          <p>
            Puzzles completed: {puzzlesCompleted} / {puzzles.length}
          </p>
          <p>
            Current puzzle: {currentPuzzle + 1} / {puzzles.length}
          </p>
          <p>Puzzle Rating: {puzzles[currentPuzzle]?.Rating}</p>
          {message && <p>{message}</p>}
        </div>
      </div>
    </main>
  );
};

export default Puzzles;
