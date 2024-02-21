"use client";
import { useEffect, useMemo, useRef } from "react";
import { useChat } from "../../../context/ChatContext";
import Message from "./Message";

const ChatBody = ({ selectedChat }) => {
  const {
    state: { allChats },
  } = useChat();
  const containerRef = useRef(null);
  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };
  const messages = useMemo(() => {
    if (allChats) {
      scrollToBottom();
      let chat = allChats.find((chat) => chat.id === selectedChat);
      if (chat.name) return chat.Messages;
      else return chat.messages;
    }
    return [];
  }, [allChats, selectedChat]);

  useEffect(() => {
    scrollToBottom();
  }, []);
  return (
    <div
      ref={containerRef}
      className="grow p-8 flex flex-col gap-4 main-height"
    >
      {messages.map((message, key) => (
        <Message key={key} message={message} />
      ))}
    </div>
  );
};

export default ChatBody;