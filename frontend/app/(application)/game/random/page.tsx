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
    render();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const RandomGame = () => {
    dispatch({ type: "UPDATE_PLAYERS_DATA", payload: gameState.players });
  };

  const PlayerMoved = () => {
    dispatch({ type: "UPDATE_PLAYERS_Y", payload: gameState.players });
  };

  const BallMoved = () => {
    dispatch({ type: "UPDATE_BALL", payload: gameState.ball });
  };

  const updateScore = () => {
    dispatch({ type: "UPDATE_SCORE", payload: gameState.score });
  };

  useEffect(() => {
    if (socketGame){
      socketGame.on("RandomMatch", RandomGame);
      socketGame.on("PlayerMoved", PlayerMoved);
      socketGame.on("BallMoved", BallMoved);
      socketGame.on("updateScore", updateScore);
    }
    return () => {
        socketGame.off("RandomMatch", RandomGame);
        socketGame.off("PlayerMoved", PlayerMoved);
        socketGame.off("BallMoved", BallMoved);
        socketGame.off("updateScore", updateScore);
    };
  }, [dispatch]);

  useEffectOnce(() => {
    if (socketGame) {
      socketGame.emit("StartRandomMatch", { player: state.user.id });
    }
  });

  useEffectOnce(() => {
    if (socketGame) {
      const keyPress = (e: KeyboardEvent) => {
        if (e.key === "ArrowUp") {
          dispatch({ type: "PLAYER_MOVE_UP" });
          socketGame.emit("move", {
            player: state.user.id,
            direction: "up",
            room: gameState.room,
          });
        }
        if (e.key === "ArrowDown") {
          dispatch({ type: "PLAYER_MOVE_DOWN" });
          socketGame.emit("move", {
            player: state.user.id,
            direction: "down",
            room: gameState.room,
          });
        }
      };
      window.addEventListener("keydown", keyPress);
    }
    // return () => {
    //   window.removeEventListener("keydown", keyPress);
    // };
  
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
