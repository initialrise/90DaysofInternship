import "./Board.css";
const Black = () => <div className="black"></div>;
const White = () => <div className="white"></div>;
const Board = () => {
  return (
    <div className="board">
      {[...Array(64).keys()].map((ind) => (
        <li key={ind}>{ind % 2 === 0 ? <Black /> : <White />}</li>
      ))}
    </div>
  );
};

export default Board;
