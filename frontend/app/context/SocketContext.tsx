"use client";

import Cookies from "js-cookie";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";



const SocketContext = createContext<any>(null);

const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
  const  [socket, setSocket] = useState<Socket>();
      useEffect(() => {
        const socketIo: Socket = io("http://localhost:3000/game", {
          auth: {
            token: Cookies.get("USER_ID"),
          },
        });
        setSocket(socketIo);
        return () => {
          socketIo.disconnect();
        };
      }, []);
  

  return <SocketContext.Provider value={{socket}}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
  const context = useContext(SocketContext);


  if (!context) {
    throw new Error("");
  }

  return context;
};

export default SocketContextProvider;


