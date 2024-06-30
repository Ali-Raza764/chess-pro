import { useState, useEffect } from "react";
import sounds from "@/components/game/assets/sounds"; //Board Sounds

const useSound = (game) => {
  const [currentSound, setCurrentSound] = useState(null);

  const playSound = (sound) => {
    setCurrentSound(sound);
  };

  const handleSound = (move) => {
    if (game.isCheckmate()) {
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

  return { currentSound, handleSound };
};

export default useSound;
