"use client";
import Cookies from "js-cookie";
import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  useRef,
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
  // console.log("action", action?.payload.player);
  switch (action.type) {
    case "UPDATE_PLAYERS_DATA":
      return {
        ...state,
        playerAvatar:
          id === action?.payload?.player
            ? action?.payload?.playerAvatar
            : action?.payload?.opponentAvatar,
        opponentAvatar:
          id === action?.payload?.opponent
            ? action?.payload?.playerAvatar
            : action?.payload?.opponentAvatar,
        playerY:
          id === action?.payload?.player
            ? action?.payload?.playerY
            : action?.payload?.opponentY,
        opponentY:
          id === action?.payload?.opponent
            ? action?.payload?.playerY
            : action?.payload?.opponentY,
        room: action?.payload?.room,
      };
    case "UPDATE_PLAYERS_Y":
      return {
        ...state,
        playerY:
          id === action?.payload?.player
            ? action?.payload?.playerY
            : action?.payload?.opponentY,
        opponentY:
          id !== action?.payload?.player
            ? action?.payload?.opponenetY
            : action?.payload?.playerY,
      };
    case "UPDATE_BALL":
      return {
        ...state,
        ballX:
          id === action?.payload?.player
            ? action?.payload?.x
            : 1080 - action?.payload?.x,
        ballY: action?.payload?.y,
      };
    case "UPDATE_SCORE":
      return {
        ...state,
        playerScore:
          id === action?.payload?.player
            ? action?.payload?.playerScore
            : action?.payload?.opponentScore,
        opponentScore:
          id !== action?.payload?.player
            ? action?.payload?.playerScore
            : action?.payload?.opponentScore,
      };
  }
}

const GameContextProvider = ({ children }) => {
  const [socketGame, setSocket] = useState<Socket | null>(null);
  const [gameState, dispatch] = useReducer(reducer, initialState);
  const jwt_token = Cookies.get("JWT_TOKEN");

  async function getWinnerAndLoser(winnerId: string, loserId: string) {
    try {
      if (jwt_token) {
        const response = await axios.post(
          "http://localhost:3000/game/endGame",
          {
            winnerId: winnerId,
            loserId: loserId,
          },
          {
            headers: {
              Authorization: `Bearer ${jwt_token}`,
            },
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          console.log("Data updated successfully !!!");
        }
      }
    } catch (error) {
      console.log(`an error occured during game end ${error.message}`);
    }
  }
  useEffect(() => {
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

  useEffect(() => {
    if (!socketGame) return;
    socketGame.on("RandomMatch", (data) => {
      dispatch({ type: "UPDATE_PLAYERS_DATA", payload: data });
    });
    socketGame.on("PlayerMoved", (data) => {
      // console.log("PlayerMoved", data);
      dispatch({ type: "UPDATE_PLAYERS_Y", payload: data });
    });
    socketGame.on("BallMoved", (data) => {
      // console.log("BallMoved", data);
      dispatch({ type: "UPDATE_BALL", payload: data });
    });
    socketGame.on("updateScore", (data) => {
      // console.log("updateScore", data);
      dispatch({ type: "UPDATE_SCORE", payload: data });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketGame]);

  return (
    <GameContext.Provider
      value={{
        socketGame,
        gameState,
        getWinnerAndLoser,
        dispatch,
      }}
    >
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
