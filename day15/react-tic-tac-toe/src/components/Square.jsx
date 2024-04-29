const Square = ({ value, onSquareClick, isWinnerBlock }) => {
  const winnerCss = isWinnerBlock ? "text-[#F3B237]" : "text-[#31C4BE]";
  console.log(winnerCss);

  return (
    <button
      className={`h-[100px]  ${winnerCss} square border-solid border-black border bg-[#1F3540] p-[20px] font-bold text-[40px]  shadow-2xl rounded-[15px] shadow-[1px_8px_5px_1px_rgba(0,0,0,0.78)]`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
};

export default Square;
