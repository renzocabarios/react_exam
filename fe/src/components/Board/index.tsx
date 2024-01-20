import { useEffect, useState } from "react";
import { get, post } from "../../config";
import { calculateWinner } from "../../utils";
import Square from "../Square";
import { SOCKET } from "../../socket";

export interface IBoard {
  clientId: any;
  xIsNext: any;
  squares: any;
  onPlay: any;
  player: any;
}

export default function Board({
  player,
  clientId,
  xIsNext,
  squares,
  onPlay,
}: IBoard) {
  const [end, setend] = useState(false);
  const [winner, setwinner] = useState("");
  const [turn, setturn] = useState("X");
  async function handleClick(i: number) {
    await post("games/calculate", {
      squares,
      position: i,
      clientId,
    });
  }

  useEffect(() => {
    function onSquaresChanged(data: any) {
      onPlay(data.squares);
      setturn(data.turn);
    }

    function onWinner(data: any) {
      onPlay(data.squares);
      setend(true);
      setwinner(data.winner);
    }

    SOCKET.on("squaresChanged", onSquaresChanged);
    SOCKET.on("winner", onWinner);

    return () => {
      SOCKET.off("squaresChanged", onSquaresChanged);
      SOCKET.off("winner", onWinner);
    };
  }, []);

  return (
    <>
      <div className="status">
        {end
          ? `${player == winner ? "You win" : "You lose"}`
          : `${turn} next turn`}
      </div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
