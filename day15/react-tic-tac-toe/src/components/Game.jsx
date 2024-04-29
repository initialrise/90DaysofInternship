import { useState } from "react";
import Board from "./Board";
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to the start";
    }
    return (
      <li key={move}>
        <button
          className="rounded-full bg-yellow border-solid border p-[10px]  mt-[10px]"
          onClick={() => jumpTo(move)}
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="game bg-[#014D4E] flex flex-col justify-between items-center h-screen">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info text-white">
        <ol className=" h-[400px] grid grid-cols-3 gap-[10px] ">{moves}</ol>
      </div>
    </div>
  );
}
