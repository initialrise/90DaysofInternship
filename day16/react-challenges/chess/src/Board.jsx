import "./Board.css";
const Black = () => <div className="black bg-black w-[90px] h-[90px] border-red-800 border-[5px]"></div>;
const White = () => <div className="white bg-white w-[90px] h-[90px] border border-[5px] border-red-800" ></div>;
const Board = () => {
  return (
    <div className="board grid grid-cols-8 w-[800px]  grid-rows-8 p-[30px] h-screen bg-amber-400 justify-center">
      {[...Array(64).keys()].map((ind) => (
        <div key={ind}>{ind % 2 === 0 ? <Black /> : <White />}</div>
      ))}
    </div>
  );
};

export default Board;
