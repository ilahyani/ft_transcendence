import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import AuthContextProvider from "./context/AuthContext";
import SocketContextProvider from "./context/SocketContext";
import "./globals.css";
import GameContextProvider from "./context/GameContext";

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
            <GameContextProvider>{children}</GameContextProvider>
          </SocketContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
