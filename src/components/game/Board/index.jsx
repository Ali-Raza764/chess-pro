import { useRef, useState, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { useMediaQuery } from "react-responsive";
import sounds from "@/components/game/assets/sounds"; //Board Sounds
import { socket } from "@/utils/socket/socket";

// Other Components
import PreviousMoves from "./PreviousMoves";
import Users from "./Users";
import Clock from "./Clock";
import RematchButton from "./RematchButton";
import GameActions from "./GameActions";
import CreateGame from "@/components/game/CreateGame";

export default function Board({ side, roomId, players, time }) {
  const chess = new Chess();
  const audioRef = useRef(null);
  const [currentSound, setCurrentSound] = useState(null);
  const [game, setGame] = useState(chess);
  const [moves, setMoves] = useState([]);
  const [gameover, setGameover] = useState(false);
  const [isWhitePaused, setIsWhitePaused] = useState(false);
  const [isBlackPaused, setIsBlackPaused] = useState(true);
  const [winner, setWinner] = useState(null);
  const [looser, setLooser] = useState(null);
  const [message, setMessage] = useState("");
  const isLargeScreen = useMediaQuery({ minWidth: 768 });
  // const isLargeScreen = true
  const isReady = players.length === 2 ? true : false;

  useEffect(() => {
    socket.on("sendresign", (res) => {
      setGameover(true);
      playSound(sounds.CheckmateSound)
      setIsBlackPaused(true);
      setIsWhitePaused(true);
      setMessage(res.type);
      if (res.side === "white") {
        setWinner("Black");
        setLooser("White");
      }
      if (res.side === "black") {
        setWinner("White");
        setLooser("Black");
      }
    });

    socket.on("makemove", (move) => {
      setOpponentPieces(move);
    });

    return () => {
      socket.off("gameover");
      socket.off("makemove");
    };
  }, [game]);

  const setOpponentPieces = (move) => {
    if (gameover) return;
    try {
      const madeMove = game.move({
        from: move.from,
        to: move.to,
        promotion: move.promotion || "q",
      });
      setGame(new Chess(game.fen()));

      //* Handle Time Clock
      if (side === "white") {
        setIsWhitePaused(false);
        setIsBlackPaused(true);
      } else {
        setIsWhitePaused(true);
        setIsBlackPaused(false);
      }
      setMoves((prevMoves) => [...prevMoves, madeMove]);
      controlSounds(madeMove);
    } catch (error) {
      console.error("Invalid move:", move);
    }
  };

  const makeMove = (sourceSquare, targetSquare, piece) => {
    //* We have to stop the player from moving opponent pieces so we check the side of the user and the piece they moved
    //* The piece notaion is like wq, bq etc. We can split it to check the first part w or b for white and black
    const movedPiceColor = piece[0]?.toLowerCase();
    if (movedPiceColor === "w" && side === "black") {
      // if the piece is white and the user is black then donot accept the move
      return null;
    } else if (movedPiceColor === "b" && side === "white") {
      // if the piece is black and the user is white then donot accept the move
      return null;
    }

    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: piece[1]?.toLowerCase() || "q",
      });

      if (move) {
        socket.emit("move", move, roomId);

        //* Handle Time Clock
        if (side === "white") {
          setIsWhitePaused(true);
          setIsBlackPaused(false);
        } else {
          setIsWhitePaused(false);
          setIsBlackPaused(true);
        }
        setMoves([...moves, move]);
      }

      return move;
    } catch (error) {
      return null
    }
  };

  function onDrop(sourceSquare, targetSquare, piece) {
    if (!isReady || gameover) {
      return;
    }
    const move = makeMove(sourceSquare, targetSquare, piece);

    if (move === null) return "Invalid Move";

    controlSounds(move);
    return true;
  }

  const controlSounds = (move) => {
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
    setCurrentSound(sound);
  };

  return (
    <section className="w-full min-h-screen flex flex-wrap gap-4 justify-center">
      <div className="w-full lg:w-[50vw] flex flex-col">
        <audio ref={audioRef} src={currentSound} preload="auto" autoPlay />
        {isLargeScreen && (
          <Chessboard
            id="PlayVsRandom"
            position={game.fen()}
            onPieceDrop={onDrop}
            customBoardStyle={{
              borderRadius: "4px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
            }}
            boardOrientation={side}
            boardWidth={500}
          />
        )}
        {!isLargeScreen && (
          <Chessboard
            id="PlayVsRandom"
            position={game.fen()}
            onPieceDrop={onDrop}
            customBoardStyle={{
              borderRadius: "4px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
            }}
            boardOrientation={side}
          />
        )}

        <div className="lg:hidden">
          {/* Clock For Mobile Devices */}
          <Users players={players} />
          <div className="flex items-center justify-between">
            <Clock
              initialTime={time}
              isPaused={isWhitePaused}
              setGameover={setGameover}
            />
            <Clock
              initialTime={time}
              isPaused={isBlackPaused}
              setGameover={setGameover}
            />
          </div>
        </div>
      </div>

      <div className="h-full w-full lg:w-full flex flex-1 flex-col gap-3">
        <PreviousMoves moves={moves} />
        <div className="flex flex-col h-full">
          <div className={"users hidden lg:block"}>
            <Users players={players} />
            <div className="flex items-center justify-between">
              <Clock
                initialTime={time}
                isPaused={isWhitePaused}
                setGameover={setGameover}
              />
              <Clock
                initialTime={time}
                isPaused={isBlackPaused}
                setGameover={setGameover}
              />
            </div>
          </div>
          {gameover && (
            <div className="mt-4">
              <p className="text-lg font-sans">
                {winner} Won! {looser} {message}
              </p>
              <div className="flex items-center gap-4 mt-3">
                <CreateGame seconds={time} name={"New"} />
                {message === "Resigned" && <RematchButton roomId={roomId} />}
              </div>
            </div>
          )}
          {!gameover && <GameActions roomId={roomId} side={side} />}
        </div>
      </div>
    </section>
  );
}
