import { useState } from "react";
import Square from "./Square";

const Board = ({ xIsNext, squares, onPlay }) => {
  let winnerArray = null;
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        winnerArray = [a, b, c];
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i) => {
    const newSquares = [...squares];
    //do nothing if already clicked or winner already set
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    //set x or o if not set
    if (!squares[i]) {
      if (xIsNext) newSquares[i] = "X";
      else newSquares[i] = "O";
    }
    onPlay(newSquares);
  };
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const isWinnerBlock = (i) => {
    if (winnerArray) {
      return winnerArray.includes(i);
    }
    return false;
  };
  return (
    <>
      <div className="status text-white text-center">{status}</div>

      <div className="board w-[500px] grid grid-cols-3 gap-[15px]">
        {[...Array(9).keys()].map((ind) => (
          <Square
            value={squares[ind]}
            onSquareClick={() => handleClick(ind)}
            key={ind}
            isWinnerBlock={isWinnerBlock(ind)}
          />
        ))}
      </div>
    </>
  );
};

export default Board;
