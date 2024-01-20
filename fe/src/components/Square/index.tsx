export interface ISquare {
  value: any;
  onSquareClick: any;
}

export default function Square({ value, onSquareClick }: ISquare) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
