import Puzzles from "./Puzzles";

const PuzzlesPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUZZLES_API_URl}/puzzles?limit=50`);
  const puzzles = await res.json();

  return <Puzzles puzzles={puzzles} />;
};

export default PuzzlesPage;
