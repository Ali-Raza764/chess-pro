import { useState } from "react";
import { Chessboard } from "react-chessboard";
import sounds from "@/components/game/assets/sounds"; //Board Sounds
import PreviousMoves from "@/components/game/Board/PreviousMoves";
import EvalBar from "./EvalBar";

const Board = ({
  game,
  afterMove,
  customComponent,
  renderCustomComponent,
  showEvalBar,
  evaluation,
  allowMoveOpponentPieces,
  gameOver,
  showPreviousMoves,
  ...rest
}) => {
  const [boardFen, setBoardFen] = useState(game.fen()); // Just for rerender
  const [currentSound, setCurrentSound] = useState(null);
  const [moves, setMoves] = useState([]);

  const makeMove = (sourceSquare, targetSquare, piece) => {
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: piece[1]?.toLowerCase() || "q",
      });
      setBoardFen(game.fen());
      setMoves((prevMoves) => [...prevMoves, move]);
      handleSound(move);
      return move;
    } catch (error) {
      return null;
    }
  };
  const handleDrop = (sourceSquare, targetSquare, piece) => {
    if (gameOver) {
      return;
    }

    const side = { ...rest }.boardOrientation;
    const pieceColour = piece[0];

    // Using a prop you can control the user from moving opponent pieces
    if (!allowMoveOpponentPieces) {
      if (side[0] !== piece[0]) return false;
    }
    const move = makeMove(sourceSquare, targetSquare, piece);
    if (move === null) return false;
    afterMove(move);
    return true;
  };

  const handleSound = (move) => {
    if (game.isCheckmate()) {
      setIsBlackPaused(true);
      setIsWhitePaused(true);
      playSound(sounds.CheckmateSound);
    } else if (game.isCheck()) {
      playSound(sounds.CheckSound);
    } else if (move.captured) {
      playSound(sounds.capturePieceSound);
    } else if (move.promotion) {
      playSound(sounds.PromotionSound);
    } else if (move.san === "O-O" || move.san === "O-O-O") {
      playSound(sounds.CastlingSound);
    } else {
      playSound(sounds.SimpleMoveSound);
    }
  };

  const playSound = (sound) => {
    setCurrentSound(sound);
  };

  return (
    <section className="h-full w-full lg:flex gap-6 items-center justify-center">
      <audio autoPlay src={currentSound} />
      <div className="w-full flex items-center justify-center gap-3">
        {showEvalBar && <EvalBar evaluation={evaluation} />}
        <Chessboard
          id={"Analysis board"}
          onPieceDrop={handleDrop}
          boardWidth={450}
          position={game.fen()}
          customBoardStyle={{
            borderRadius: "4px",
          }}
          {...rest}
        />
      </div>
      <div className="w-full h-full flex flex-col-reverse lg:flex-col">
        {showPreviousMoves && <PreviousMoves moves={moves} />}
        {customComponent && renderCustomComponent()}
      </div>
    </section>
  );
};

export default Board;
