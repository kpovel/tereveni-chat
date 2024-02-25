"use client";

import { Client } from "@stomp/stompjs";
import { useState } from "react";
import { Message } from "./ReceiveMessages";

export interface MessageInterface {
  uiid: string;
  content: string;
  edited: boolean;
  myMessage: boolean;
  dateOfCreated: string;
}

export default function MessagesField({
  messagesInit,
  currentChatUserUIID,
  chatId,
  jwtAccessToken,
}: {
  messagesInit: Message[];
  currentChatUserUIID: string;
  chatId: string;
  jwtAccessToken: string;
}) {
  const [messages, setMessages] = useState(messagesInit);

  const client = new Client({
    brokerURL: `ws://138.68.69.149:8080/ws`,
    onConnect: () => {
      client.subscribe(`/topic/${chatId}`, (message) => {
        const body = JSON.parse(message.body) as Message;
        setMessages([...messages, body]);
      });
      client.publish({
        destination: `/app/hello/${chatId}`,
        body: "First Message",
      });
    },
  });

  client.activate();

  function sendMessage() {
    client.publish({
      destination: `/app/hello/${chatId}`,
      body: JSON.stringify({
        currentChatUserUIID,
        content: "asdf",
        edited: false,
        Authorization: `Bearer ${jwtAccessToken}`,
      }),
    });
  }
  return (
    <div className="relative h-full overflow-scroll px-6">
      <button onClick={sendMessage}>Send Message</button>
      <div className="border">
        {messages.map((m) => {
          return <div key={m.uuid}>Message: {m.content}</div>;
        })}
      </div>
      {/* {!messages ? (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <p className="text-center text-sm font-normal text-white text-opacity-50">
            No messages here yet
          </p>
        </div>
      ) : null}
      <div className="flex flex-col space-y-5">
        <RenderMessages messages={messages} />
      </div>
      */}
    </div>
  );
}

function RenderMessages({ messages }: { messages: Message[] }) {
  return (
    <>
      {messages.map((message) => (
        <div
          key={message.uuid}
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
      ))}
    </>
  );
}
