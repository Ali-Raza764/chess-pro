async function fetchBestMove(fen) {
  const url = process.env.NEXT_PUBLIC_STOCKFISH_API_URL;
  const data = new FormData();
  data.append("fen", fen);

  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_STOCKFISH_API_KEY,
      "x-rapidapi-host": process.env.NEXT_PUBLIC_STOCKFISH_API_HOST,
    },
    body: data,
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
export default fetchBestMove;
