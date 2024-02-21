"use client";
import { useAuth } from "../../../context/AuthContext";
import { useEffect, useRef } from "react";
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
} from "../../../../components/Game/drawutils";
import { useSocketGame } from "../../../context/GameContext";
import { useEffectOnce } from "../../../../CustomHooks/useEffectonce";

const RandomMatchPage = () => {
  const canvaRef = useRef<HTMLCanvasElement>(null);
  const { socketGame, dispatch, gameState } = useSocketGame();
  const { state } = useAuth();
  const render = () => {
    const canvas = canvaRef.current;
    const context = canvas?.getContext("2d");
    if (!context) return;
    console.log('before', gameState);
    if (!gameState && !gameState.ballY && !gameState.ballX && !gameState.playerY && !gameState.opponentY) return;
    console.log('after', gameState);
    if (state.user.gameTheme === "Retro") {
      drawTable(context, canvas, canvasHeight, canvasWidth, "#000");
      drawRect(
        context,
        Player.x,
        gameState.playerY,
        Player.width,
        Player.height,
        Player.color
      );
      // drawRect(
      //   context,
      //   Opponent.x,
      //   gameState.opponentY,
      //   Opponent.width,
      //   Opponent.height,
      //   Opponent.color
      // );
      drawNet(context, canvas, net.x, net.y, net.width, net.height, net.color);
      drawBall(context, gameState.ballX, gameState.ballY, "white");
    } else if (state.user.gameTheme === "Blue") {
      drawTable(context, canvas, canvasHeight, canvasWidth, "#056CF2");
      drawRect(
        context,
        Player.x,
        gameState.playerY,
        Player.width,
        Player.height,
        Player.color
      );
      drawRect(
        context,
        Opponent.x,
        gameState.opponentY,
        Opponent.width,
        Opponent.height,
        Opponent.color
      );
      drawNet(context, canvas, net.x, net.y, net.width, net.height, net.color);
      drawBall(context, gameState.ballX, gameState.ballY, "white");
    } else if (state.user.gameTheme === "Gray") {
      drawTable(context, canvas, canvasHeight, canvasWidth, "#000");
      drawRect(
        context,
        Player.x,
        gameState.playerY,
        Player.width,
        Player.height,
        Player.color
      );
      drawRect(
        context,
        Opponent.x,
        gameState.opponentY,
        Opponent.width,
        Opponent.height,
        Opponent.color
      );
      drawNet(context, canvas, net.x, net.y, net.width, net.height, net.color);
      drawBall(context, gameState.ballX, gameState.ballY, "white");
    }
  };

  const gameLoop = () => {
    render();
  };
  useEffect(() => {
      gameLoop();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState]);


  useEffectOnce(() => {
    if (socketGame) {
      socketGame.emit("StartRandomMatch", { player: state.user.id });
    }
  });

  useEffectOnce(() => {
    if (socketGame && gameState) {
      const keyPress = (e: any) => {
        if (e.key === "ArrowUp") {
          dispatch({ type: "UPDATE_PLAYERS_Y" });
          socketGame.emit("move", {
            player: state.user.id,
            direction: "up",
            room: gameState.room,
          });
          console.log("up");
        }
        if (e.key === "ArrowDown") {
          dispatch({ type: "UPDATE_PLAYERS_Y" });
          socketGame.emit("move", {
            player: state.user.id,
            direction: "down",
            room: gameState.room,
          });
          console.log("down");
        }
      };
      window.addEventListener("keydown", keyPress);
      return () => {
        window.removeEventListener("keydown", keyPress);
      };
    }
  });

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
};

export default RandomMatchPage;
