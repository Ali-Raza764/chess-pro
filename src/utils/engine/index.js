import { useState, useEffect, useCallback } from "react";

export function useStockfish() {
  const [stockfish, setStockfish] = useState(null);

  const loadEngine = useCallback(() => {
    const worker = new Worker("/stockfish.js");
    setStockfish(worker);
  }, []);

  const sendCommand = useCallback((command) => {
    if (stockfish) {
      stockfish.postMessage(command);
    }
  }, [stockfish]);

  useEffect(() => {
    return () => {
      if (stockfish) {
        stockfish.terminate();
      }
    };
  }, [stockfish]);

  return { stockfish, sendCommand, loadEngine };
}