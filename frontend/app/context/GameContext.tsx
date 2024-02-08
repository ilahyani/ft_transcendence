"use client";
import Cookies from "js-cookie";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Socket, io } from "socket.io-client";

const initialState = {
  playerAvatar: "",
  opponentAvatar: "",
  playerY: "",
  opponentY: "",
  room: "",
  ballX: 0,
  ballY: 0,
};

const GameContext = createContext(null);
function reducer(state, action) {
  const id = Cookies.get("USER_ID");

  switch (action.type) {
    case "UPDATE_PLAYERS_DATA":
      return {
        ...state,
        playerAvatar:
          id === action.payload.player
            ? action.payload.playerAvatar
            : action.payload.opponentAvatar,
        opponentAvatar:
          id === action.payload.opponent
            ? action.payload.playerAvatar
            : action.payload.opponentAvatar,
        playerY:
          id === action.payload.player
            ? action.payload.playerY
            : action.payload.opponentY,
        opponentY:
          id === action.payload.opponent
            ? action.payload.playerY
            : action.payload.opponentY,
        room: action.payload.room,
      };
    case "UPDATE_PLAYERS_Y":
      return {
        ...state,
        playerY:
          id === action.payload.player
            ? action.payload.playerY
            : action.payload.opponentY,
        opponentY:
          id !== action.payload.player
            ? action.payload.opponenetY
            : action.payload.payload.playerY,
      };
    case "UPDATE_BALL":
      return {
        ...state,
        ballX:
          id === action.payload.player
            ? action.payload.x
            : 1080 - action.payload.x,
        ballY: action.payload.y,
      };
    case "UPDATE_SCORE":
      return {
        ...state,
        playerScore:
          id === action.payload.player
            ? action.payload.playerScore
            : action.payload.opponentScore,
        opponentScore:
          id !== action.payload.player
            ? action.payload.playerScore
            : action.payload.opponentScore,
      };
  }
}

const GameContextProvider = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log("Socket connected");
    const newSocket: Socket = io("http://localhost:3000/game", {
      auth: {
        token: Cookies.get("USER_ID"),
      },
    });
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const JoinRandomGame = () => {
    if (socket) {
    //   console.log("Joining Random Game");
      socket.emit("RandomMatch", { player: Cookies.get("USER_ID") });
    }
  };

  useEffect(() => {
    if (!socket) return;
    socket.on("RandomMatch", (data) => {
      dispatch({ type: "UPDATE_PLAYERS_DATA", payload: data });
    });
    socket.on("PlayerMoved", (data) => {
      dispatch({ type: "UPDATE_PLAYERS_Y", payload: data });
    });
    socket.on("BallMoved", (data) => {
      dispatch({ type: "UPDATE_BALL", payload: data });
    });
    socket.on("updateScore", (data) => {
      dispatch({ type: "UPDATE_SCORE", payload: data });
    });
  }, [socket]);

  return (
    <GameContext.Provider value={{ socket, JoinRandomGame, initialState }}>
      {children}
    </GameContext.Provider>
  );
};

export const useSocketGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("GameContext is undefined");
  }

  return context;
};

export default GameContextProvider;
