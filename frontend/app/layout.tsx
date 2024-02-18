import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import AuthContextProvider from "./context/AuthContext";
import ChatSocketContextProvider from "./context/ChatContext";
import SocketContextProvider from "./context/SocketContext";
import GameContextProvider from "./context/GameContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PONG CLUB",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <SocketContextProvider>
            <GameContextProvider>
              <ChatSocketContextProvider>{children}</ChatSocketContextProvider>
            </GameContextProvider>
          </SocketContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
