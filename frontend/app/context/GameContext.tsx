"use client";
import Cookies from "js-cookie";
import axios from "axios";
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
  if (!action.data || !state) return;
  switch (action.type) {
    case "UPDATE_PLAYERS_DATA":
      return {
        ...state,
        playerAvatar: action.data.player === id ? action.data.playerAvatr : action.data.opponentAvatar,
        opponentAvatar: action.data.opponent === id ? action.data.playerAvatr : action.data.opponentAvatar,
        playerY: action.data.player === id ? action.data.playerY : action.data.opponentY,
        opponentY: action.data.opponent === id ? action.data.playerY : action.data.opponentY,
        room: action.data.room,
      };
    case "UPDATE_PLAYERS_Y":
      return {
        ...state,
        playerY: action.data.player === id ? action.data.playerY : action.data.opponentY,
        opponentY: action.data.opponent === id ? action.data.playerY : action.data.opponentY,
      };
    case "UPDATE_BALL":
      return {
        ...state,
        ballX: action.data.player === id ? action.data.x : 1080 - action.data.x,
        ballY: action.data.y,
      };
    case "UPDATE_SCORE":
      return {
        ...state,
        playerScore: action.data.player === id ? action.data.playerScore : action.data.opponentScore,
        opponentScore: action.data.opponent === id ? action.data.playerScore : action.data.opponentScore,
      };
    default:
      return state;
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
