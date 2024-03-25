"use client";
import { MessageContainer } from "@/components/chat/MessageContainer";
import { ChatRoom } from "./chatRooms";
import { useState } from "react";

export function ChatList({
  chatList,
  lang,
}: {
  chatList: ChatRoom[];
  lang: Lang;
}) {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  return (
    <>
      {chatList.map((chatRoom) => {
        return (
          <MessageContainer
            key={chatRoom.chatRoom.uuid}
            chatRoom={chatRoom}
            lang={lang}
            setSelectedChat={setSelectedChat}
            selectedChat={selectedChat}
          />
        );
      })}
    </>
  );
}
