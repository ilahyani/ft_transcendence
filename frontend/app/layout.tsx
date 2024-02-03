import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import AuthContextProvider from "./context/AuthContext";
import "./globals.css";
import SocketContextProvider from "./context/SocketContext";

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
          <SocketContextProvider>{children}</SocketContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
