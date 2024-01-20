import { Response } from "express";
import { calculate } from "../../../utils";
import { state } from "../../../..";

const get = async (_req: any, _res: Response) => {
  _res.send({
    data: [],
    status: "success",
    message: "Calculate winner success",
  });
};

const add = async (_req: any, _res: Response) => {
  // console.log(calculate(_req.body.state));
  _res.send({
    data: _req.body.state,
    status: "success",
    message: "Calculate winner success",
  });
};

const calculateWinner = async (_req: any, _res: Response) => {
  const { squares, position, clientId } = _req.body;
  console.log(squares);
  console.log(calculate(squares));

  if (calculate(squares) || squares[position]) {
    _res.send({
      data: [],
      status: "success",
      message: "Calculate winner success",
    });
    return;
  }

  const nextSquares = squares.slice();

  if (state.turn == 0 && state.players[0] == clientId) {
    nextSquares[position] = "X";
    state.turn = 1;
  }

  if (state.turn == 1 && state.players[1] == clientId) {
    nextSquares[position] = "O";
    state.turn = 0;
  }

  if (!calculate(nextSquares)) {
    _req.io.emit("squaresChanged", {
      squares: nextSquares,
      turn: state.turn == 0 ? "X" : "O",
    });

    _res.send({
      data: nextSquares,
      status: "success",
      message: "Calculate winner success",
    });
    return;
  }

  _req.io.emit("winner", {
    squares: nextSquares,
    winner: calculate(nextSquares),
  });

  _res.send({
    data: nextSquares,
    status: "success",
    message: "Calculate winner success",
  });
};

export { get, add, calculateWinner };
