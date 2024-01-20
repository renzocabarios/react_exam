import { useEffect, useState } from "react";
import Board from "../Board";
import { SOCKET } from "../../socket";

export interface IGame {}

export default function Game({}: IGame) {
  const [clientId, setclientId] = useState<any>(null);
  const [player, setplayer] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  useEffect(() => {
    function onClientConnected(data: any) {
      setclientId(data.clientId);
      setplayer(data.player);
    }

    SOCKET.on("clientConnected", onClientConnected);

    return () => {
      SOCKET.off("clientConnected", onClientConnected);
    };
  }, [clientId]);

  function handlePlay(nextSquares: number) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <p>{player}</p>
      <div className="game-board">
        <Board
          player={player}
          clientId={clientId}
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
