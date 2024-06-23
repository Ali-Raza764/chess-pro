import React from "react";

const PreviousMoves = ({ moves }) => {
  // Todo make a new Array Of moves that has a pair of moves for white and black.
  // A move consists of two pairs from white and black and their serial number
  let MoveData = [];
  for (let move = 0; move < moves.length; move++) {
    const previousMoveIndex = move - 1;
    if (move % 2 === 1) {
      MoveData.push({
        white: {
          move: moves[move].san,
        },
        black: {
          move: moves[previousMoveIndex].san,
        },
      });
    }
  }

  return (
    <div className="w-full min-h-[30vh] max-h-[40vh] overflow-y-auto bg-white bg-opacity-20 backdrop-blur-md rounded-lg border-gray-500 border-opacity-30 shadow-lg p-4 border-2">
      <h1 className="text-3xl font-bold font-sans">Moves</h1>

      <table className="border shadow w-full">
        <thead>
          <tr className="flex justify-between">
            <th>NO</th>
            <th>White</th>
            <th>Black</th>
          </tr>
        </thead>
        <tbody>
          {MoveData.map((move, i) => (
            <tr className="w-full flex justify-between" key={i}>
              <td>{i + 1}</td>
              <td>{move.black.move}</td>
              <td>{move.white.move}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PreviousMoves;
