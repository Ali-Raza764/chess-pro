import { useState } from "react";
import { Chessboard } from "react-chessboard";
import sounds from "@/components/game/assets/sounds"; //Board Sounds
import PreviousMoves from "@/components/game/Board/PreviousMoves";

const Board = ({
  game,
  afterMove,
  customComponent,
  renderCustomComponent,
  ...rest
}) => {
  const [boardFen, setBoardFen] = useState(game.fen()); // Just for rerender
  const [currentSound, setCurrentSound] = useState(null);
  const [moves, setMoves] = useState([]);

  const handleDrop = (sourceSquare, targetSquare, piece) => {
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: piece[1]?.toLowerCase() || "q",
      });
      setBoardFen(game.fen());
      setMoves((prevMoves) => [...prevMoves, move]);
      handleSound(move);
      afterMove();
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleSound = (move) => {
    if (game.isCheckmate()) {
      setGameover(true);
      setIsBlackPaused(true);
      setIsWhitePaused(true);
      playSound(sounds.CheckmateSound);
    } else if (game.isCheck()) {
      playSound(sounds.CheckSound);
    } else if (move.captured) {
      playSound(sounds.capturePieceSound);
    } else if (move.promotion) {
      playSound(sounds.PromotionSound);
    } else if (move.san === "O-O") {
      playSound(sounds.CastlingSound);
    } else {
      playSound(sounds.SimpleMoveSound);
    }
  };

  const playSound = (sound) => {
    console.log("Playing Sound");
    setCurrentSound(sound);
  };

  return (
    <section className="h-full w-full flex flex-col lg:flex-row gap-6">
      <audio autoPlay src={currentSound} />
      <div className="w-full">
        <Chessboard
          id={"Analysis board"}
          onPieceDrop={handleDrop}
          boardWidth={500}
          position={game.fen()}
          customBoardStyle={{
            borderRadius: "4px",
          }}
          {...rest}
        />
      </div>
      <div className="w-full h-full flex flex-col-reverse lg:flex-col">
        <PreviousMoves moves={moves} />
        {customComponent && renderCustomComponent()}
      </div>
    </section>
  );
};

export default Board;
