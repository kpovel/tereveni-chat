"use client";

import { useEffect, useRef } from "react";
import { Message } from "./page";

export default function RenderMessages({ messages, currentChatUserUUID }: { messages: Message[], currentChatUserUUID:string }) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const formatTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="align-end flex flex-col justify-end space-y-5 overflow-y-scroll">
      {messages.map((message) => (
        <div
          key={message.uuid}
          className={`relative max-w-[80%] rounded-2xl px-3 py-2 text-sm font-normal ${
            message.uuid === currentChatUserUUID
              ? "self-start bg-neutral-50 text-[#050404]"
              : "self-end bg-[#7c03f6] text-[#FAFAFA]"
          }`}
        >
          <p>{message.content}</p>
          <div
            className={`absolute bottom-0 text-xs font-light text-[#C2C2C2] ${
              message.uuid === currentChatUserUUID
                ? "right-full mr-1"
                : "left-full ml-1"
            }`}
          >
            <span>{formatTime(message.dateOfCreated)}</span>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
