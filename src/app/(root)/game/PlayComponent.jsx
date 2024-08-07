"use client";
import { socket } from "@/utils/socket/socket";
import { Chess } from "chess.js";
import React, { useEffect, useState } from "react";
import Board from "../../../components/game/Board";
import Users from "@/components/game/online/Users";
import GameActions from "@/components/game/online/GameActions";
import CreateGame from "@/components/game/online/CreateGame";
import RematchButton from "@/components/game/online/RematchButton";
import useSound from "@/utils/hooks/useSound";
import Waiting from "./Waiting";

const PlayComponent = ({ roomId, timeSesonds, type }) => {
  const [game, setGame] = useState(new Chess());
  const [gameInfo, setGameInfo] = useState(null);
  const [players, setPlayers] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [rematch, setRematch] = useState(false);
  const { currentSound, handleSound } = useSound(game); // Use the custom hook

  const setOpponentPieces = (move) => {
    try {
      const madeMove = game.move({
        from: move.from,
        to: move.to,
        promotion: move.promotion || "q",
      });
      setGame(new Chess(game.fen()));
      //   game.turn
      //   controlSounds(madeMove);
    } catch (error) {}
  };

  useEffect(() => {
    if ((roomId && gameInfo === null) || rematch) {
      socket.emit("create_room", roomId, "Guest", (response) => {
        if (response.success) {
          setGameInfo(response);
          setGameOver(false);
        }
      });
    }

    //* Get Players Details
    if (players === null || players.length < 2) {
      socket.emit("getUsers", roomId, (response) => {
        if (response.success) {
          setPlayers(response.players);
        } else {
          console.error("Failed to fetch users:", response.message);
        }
      });
      if (type === "link") {
        socket.emit("player_connected", roomId);
      }
    }

    //* Handle new player join in link mode
    socket.on("player_joined", (response) => {
      setPlayers(response.players);
    });

    //* Handle the Remote opponent Move
    socket.on("opponentMoved", (move) => {
      setOpponentPieces(move);
    });

    //*Handle Opponent Resignation
    socket.on("sendresign", (res) => {
      console.log("resign called");
      setGameOver(true);
    });

    //* handle Game Rematch
    socket.on("sendrematch", () => {
      setRematch(!rematch);
      setGameOver(false);
      setGame(new Chess());
    });
  }, [roomId, game, rematch]);

  const pieceMoved = async (madeMove) => {
    socket.emit("move", madeMove, gameInfo?.roomId);
    handleSound(madeMove);
  };

  const renderComponents = () => {
    return (
      <div className="h-full w-full pb-6">
        <Users players={players} />
        {gameOver ? (
          <div className="flex gap-4">
            <CreateGame name={"New"} seconds={timeSesonds} />
            <RematchButton roomId={gameInfo.roomId} />
          </div>
        ) : (
          <GameActions roomId={gameInfo.roomId} side={gameInfo.side} />
        )}
      </div>
    );
  };

  if (gameInfo === null) {
    return <div className="min-h-screen w-full overflow-hidden">Loading</div>;
  }

  if (type === "link" && players?.length < 2) {
    return <Waiting />;
  }

  return (
    <div className="h-full w-full flex items-center justify-center md:p-6">
      <audio autoPlay src={currentSound} />
      <Board
        game={game}
        key={gameInfo?.side + gameInfo.roomId}
        boardOrientation={gameInfo?.side}
        afterMove={pieceMoved}
        customComponent={true}
        renderCustomComponent={renderComponents}
        gameOver={gameOver}
        allowMoveOpponentPieces={false}
        showPreviousMoves={true}
      />
    </div>
  );
};

export default PlayComponent;
