"use client";

import { useState, ReactNode } from "react";

export interface MessageInterface {
  uiid: string;
  content: string;
  edited: boolean;
  myMessage: boolean;
  dateOfCreated: string;
}

export default function MessagesField() {
  const [messages, setMessages] = useState([
    {
      uiid: "1",
      content: "dfgdfg dfgdfgdf g df gd fg df gdfgdfgdfgdfgdfg dfgdfg",
      edited: false,
      myMessage: false,
      dateOfCreated: "12:02",
    },
    {
      uiid: "2",
      content: "Hi, what`s up?",
      edited: false,
      myMessage: true,
      dateOfCreated: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    },
    {
      uiid: "3",
      content: "dfgdfgdfg dfg d fg df g dfg dfgdfgdfgdfgdf g dfg",
      edited: false,
      myMessage: false,
      dateOfCreated: "12:02",
    },
    {
      uiid: "4",
      content: "bdhjbgfdgjhbdfjgbdf dfgdfdfgg",
      edited: false,
      myMessage: true,
      dateOfCreated: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    },
    {
      uiid: "5",
      content: "dfgdfgkjdfngdf gdfgdfgd fg",
      edited: false,
      myMessage: false,
      dateOfCreated: "12:02",
    },
    {
      uiid: "6",
      content: "dfngjdfjngkdnfkg dfgjdfngjkndfkjgnkdf   dfgdfg",
      edited: false,
      myMessage: true,
      dateOfCreated: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    },
    {
      uiid: "7",
      content: "Hi, what`s up?",
      edited: false,
      myMessage: true,
      dateOfCreated: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    },
    {
      uiid: "8",
      content: "dfgdfgdfg dfg d fg df g dfg dfgdfgdfgdfgdf g dfg",
      edited: false,
      myMessage: false,
      dateOfCreated: "12:02",
    },
    {
      uiid: "9",
      content: "bdhjbgfdgjhbdfjgbdf dfgdfdfgg",
      edited: false,
      myMessage: true,
      dateOfCreated: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    },
    {
      uiid: "10",
      content: "dfgdfgkjdfngdf gdfgdfgd fg",
      edited: false,
      myMessage: false,
      dateOfCreated: "12:02",
    },
    {
      uiid: "11",
      content: "dfngjdfjngkdnfkg dfgjdfngjkndfkjgnkdf   dfgdfg",
      edited: false,
      myMessage: true,
      dateOfCreated: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    },
  ]);

  const renderMessages = (): ReactNode => {
    return messages.map((message) => (
      <div
        key={message.uiid}
        className={`relative max-w-[80%] rounded-2xl px-3 py-2 text-sm font-normal ${
          message.myMessage
            ? "self-end bg-violet-700 text-white"
            : "self-start bg-white text-black"
        }`}
      >
        <p>{message.content}</p>
        <div
          className={`absolute bottom-0 text-xs font-bold text-stone-300 ${
            message.myMessage ? "right-full mr-1" : "left-full ml-1"
          }`}
        >
          <span>{message.dateOfCreated}</span>
        </div>
      </div>
    ));
  };

  return (
    <div className="relative h-full overflow-scroll px-6">
      {!messages ? (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <p className="text-center text-sm font-normal text-white text-opacity-50">
            No messages here yet
          </p>
        </div>
      ) : null}
      <div className="flex flex-col space-y-5">{renderMessages()}</div>
    </div>
  );
}
