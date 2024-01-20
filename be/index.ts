import "express-async-errors";
import express, { Express } from "express";
import connectDB from "./app/db";
import ENV from "./app/env/index.js";
import { addRoutes } from "./app/routes/index.js";
import { addMiddlewares } from "./app/middlewares/index.js";
import { createServer } from "http";
import { Server } from "socket.io";

const app: Express = express();

export let state: any = {
  players: [],
  turn: 0,
};

//initialization
const start = () => {
  const server = createServer(app);
  const io = new Server(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    if (state.players.length != 2) {
      io.to(socket.id).emit("clientConnected", {
        clientId: socket.id,
        player: state.players.length == 0 ? "X" : "O",
      });
      state.players.push(socket.id);
      console.log(socket.id);
      console.log(state.players);
      return;
    }
  });

  io.on("disconnect", (socket) => {
    console.log(socket);
  });
  // http://localhost:5173/
  app.use((req: any, res: any, next: any) => {
    req.io = io;
    return next();
  });
  addMiddlewares(app);
  addRoutes(app);

  app.use(function (err: any, req: any, res: any, next: any) {
    res.status(403);
    res.json({
      data: [],
      status: "fail",
      message: "Something wrong with the server",
    });
  });

  server.listen(ENV.PORT, () => {
    console.log(`Server started on port ${ENV.PORT}`);
  });
};

start();
