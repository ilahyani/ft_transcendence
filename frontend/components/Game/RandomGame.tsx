"use client";
import { useAuth } from "../../app/context/AuthContext";
import { use, useEffect, useRef } from "react";
import {
  drawTable,
  drawRect,
  drawNet,
  drawBall,
  canvasWidth,
  canvasHeight,
  net,
  Player,
  Opponent,
  ball,
} from "./drawutils";
import { useSocket } from "../../app/context/SocketContext";

export default function RandomMatch() {
  const canvaRef = useRef<HTMLCanvasElement>(null);
  const { state } = useAuth();
  const {socketGame, JoinRandomGame} = useSocket();

  const render = () => {
    const canvas = canvaRef.current;
    const context = canvas?.getContext("2d");
    if (!context) return;
    if (state.user.gameTheme === "Retro") {
      drawTable(context, canvas, canvasHeight, canvasWidth, "#000");
      drawRect(
        context,
        Player.x,
        Player.y,
        Player.width,
        Player.height,
        Player.color
      );
      drawRect(
        context,
        Opponent.x,
        Opponent.y,
        Opponent.width,
        Opponent.height,
        Opponent.color
      );
      drawNet(context, canvas, net.x, net.y, net.width, net.height, net.color);
      drawBall(context, ball.x, ball.y, "white");
    } else if (state.user.gameTheme === "Blue") {
      drawTable(context, canvas, canvasHeight, canvasWidth, "#056CF2");
      drawRect(
        context,
        Player.x,
        Player.y,
        Player.width,
        Player.height,
        Player.color
      );
      drawRect(
        context,
        Opponent.x,
        Opponent.y,
        Opponent.width,
        Opponent.height,
        Opponent.color
      );
      drawNet(context, canvas, net.x, net.y, net.width, net.height, net.color);
      drawBall(context, ball.x, ball.y, "white");
    } else if (state.user.gameTheme === "Gray") {
      drawTable(context, canvas, canvasHeight, canvasWidth, "#000");
      drawRect(
        context,
        Player.x,
        Player.y,
        Player.width,
        Player.height,
        Player.color
      );
      drawRect(
        context,
        Opponent.x,
        Opponent.y,
        Opponent.width,
        Opponent.height,
        Opponent.color
      );
      drawNet(context, canvas, net.x, net.y, net.width, net.height, net.color);
      drawBall(context, ball.x, ball.y, "white");
    }
  };

  useEffect(() => {
    if (socketGame) {
      JoinRandomGame();
    }
    return () => {
      socketGame.off();
    };
  }, []);

  useEffect(() => {
    render();
  }, []);


  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-[45%] -translate-y-1/2">
      <canvas
        className="w-full h-full"
        ref={canvaRef}
        width={canvasWidth}
        height={canvasHeight}
      ></canvas>
    </div>
  );
}
