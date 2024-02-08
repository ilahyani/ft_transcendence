"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { Socket, io } from "socket.io-client";
import cookie from "js-cookie";
import { useParams } from "next/navigation";
import Countdown from "./countdown";
import { Player, Net } from "../../types";
import axios from "axios";
import { useAuth } from "../../app/context/AuthContext";
import { useSocket } from "../../app/context/SocketContext";

const canvasWidth = 1080;
const canvasHeight = 720;



interface Props {
  setPlayerScore: (playerScore: number) => void;
  setOpponentScore: (opponentScore: number) => void;
  setLoading: (loading: boolean) => void;
}

export default function InviteMatch({
  setPlayerScore,
  setOpponentScore,
  setLoading,
}: Props) {
  const { id } = useParams();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { state, getWinnerAndLoser } = useAuth();
  const { socket } = useSocket();
  const Player: Player = {
    x: 10,
    y: canvasHeight / 2 - 50,
    width: 20,
    height: 150,
    color: "white",
    // score: 0,
  };
  const Opponent: Player = {
    x: canvasWidth - 30,
    y: canvasHeight / 2 - 50,
    width: 20,
    height: 150,
    color: "white",
  };
  const [ballY, setBallY] = useState(canvasHeight / 2);
  const [ballX, setBallX] = useState(canvasWidth / 2);
  const [countdown, setCountdown] = useState(0);
  const [startCountDown, setStartCountDown] = useState(false);
  let room = "";

  const render = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (state.user.gameTheme === "Retro") {
      drawTable(context, canvas, canvasHeight, canvasWidth, "#000");
      drawRect(
        context,
        Player.x,
        playerY,
        Player.width,
        Player.height,
        Player.color
      );
      drawRect(
        context,
        Opponent.x,
        openentY,
        Opponent.width,
        Opponent.height,
        Opponent.color
      );
      drawNet(context, canvas, net.x, net.y, net.width, net.height, net.color);
      drawBall(context, ballX, ballY, "white");
    } else if (state.user.gameTheme === "Blue") {
      drawTable(context, canvas, canvasHeight, canvasWidth, "#056CF2");
      drawRect(
        context,
        Player.x,
        playerY,
        Player.width,
        Player.height,
        Player.color
      );
      drawRect(
        context,
        Opponent.x,
        openentY,
        Opponent.width,
        Opponent.height,
        Opponent.color
      );
      drawNet(context, canvas, net.x, net.y, net.width, net.height, net.color);
      drawBall(context, ballX, ballY, "white");
    } else if (state.user.gameTheme === "Gray") {
      drawTable(context, canvas, canvasHeight, canvasWidth, "#4D5960");
      drawRect(
        context,
        Player.x,
        playerY,
        Player.width,
        Player.height,
        Player.color
      );
      drawRect(
        context,
        Opponent.x,
        openentY,
        Opponent.width,
        Opponent.height,
        Opponent.color
      );
      drawNet(context, canvas, net.x, net.y, net.width, net.height, net.color);
      drawBall(context, ballX, ballY, "white");
    }
  };

  useEffect(() => {
    const gameLoop = () => {
      setPlayerY((preV) => preV + (playerY - preV) * 0.6);
      setOpenentY((preV) => preV + (openentY - preV) * 0.6);
      render();
    };
    gameLoop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown, playerY, openentY, ballX, ballY]);

  const keyPress = (e: any) => {
    if (e.keyCode === 38) {
      socket?.emit("move", {
        player: cookie.get("USER_ID"),
        direction: "up",
        room: room,
      });
    } else if (e.keyCode === 40) {
      socket?.emit("move", {
        player: cookie.get("USER_ID"),
        direction: "down",
        room: room,
      });
    }
  };

  // useEffect(() => {
  //   const socketIo: Socket = io("http://localhost:3000/game", {
  //     auth: {
  //       token: cookie.get("USER_ID"),
  //     },
  //   });
  //   setSocket(socketIo);
  //   return () => {
  //     window?.removeEventListener("keydown", keyPress);
  //     socketIo.disconnect();
  //   };
  // }, []);

  useEffect(() => {
    if (!socket) return;
    window?.addEventListener("keydown", keyPress);
    socket.emit("InviteFriend", { player: cookie.get("USER_ID"), room: id });
    return () => {
      socket?.disconnect();
      window?.removeEventListener("keydown", keyPress);
    };
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on("InviteFriend", (data: any) => {
        if (data.player === cookie.get("USER_ID")) {
          setPlayerY(data.playerY);
          setOpenentY(data.opponentY);
          room = data.room;
        } else {
          setPlayerY(data.opponentY);
          setOpenentY(data.playerY);
          room = data.room;
        }
      });
      socket.on("PlayerMoved", (data: any) => {
        if (data.player === cookie.get("USER_ID")) {
          setPlayerY(data.playerY);
          setOpenentY(data.opponentY);
        } else {
          setOpenentY(data.playerY);
          setPlayerY(data.opponentY);
        }
      });
      socket.on("BallMoved", (data: any) => {
        if (data.player === cookie.get("USER_ID")) {
          setBallX(data.x);
        } else {
          setBallX(canvasWidth - data.x);
        }
        setBallY(data.y);
      });
      socket.on("updateScore", (data: any) => {
        if (data.player === cookie.get("USER_ID")) {
          setPlayerScore(data.playerScore);
          setOpponentScore(data.opponentScore);
        } else {
          setPlayerScore(data.opponentScore);
          setOpponentScore(data.playerScore);
        }
      });
      socket.on("CheckingWinner", (data: any) => {
        if (data.player === cookie.get("USER_ID") && data.playerScore === 5) {
          console.log("Winner");
          getWinnerAndLoser(data.player, data.opponent);
        } else if (
          data.opponent === cookie.get("USER_ID") &&
          data.opponentScore === 5
        ) {
          console.log("Winner");
          getWinnerAndLoser(data.opponent, data.player);
        }
      });
      socket.on("gameStart", () => {
        setLoading(false);
      });
      socket.on("UnexpectedWinner", (data: any) => {
        if (data.winner === cookie.get("USER_ID")) {
          setPlayerScore(data.score);
          // push the player to deashboard game to start a new game
        }
      });
      socket.on("SubmiteScore", (data: any) => {
        socket.emit("GameIsOver", { data });
      });
      // socket.on("gameOver", (data: any) => {
      //   if (data.player === cookie.get("USER_ID")) {
      //     alert("You win");
      //   } else {
      //     alert("You lose");
      //   }
      // });
      socket.on("startCountDown", (data: any) => {
        setStartCountDown(true);
        setCountdown(3);
      });
      socket.on("gameStartInvite", () => {
        setLoading(false);
      });
      socket.on("updateCountDown", (data: any) => {
        setCountdown(data);
      });
      socket.on("UnexpectedWinner", (data: any) => {
        if (data.winner === cookie.get("USER_ID")) {
          setPlayerScore(data.score);
          console.log("You win");
          // push the player to deashboard game to start a new game
        }
      });
    }
  }, [socket]);

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      {countdown > 0 && <Countdown />}
      <canvas
        className="w-full h-full"
        ref={canvasRef}
        width={1080}
        height={720}
      />
    </div>
  );
}
