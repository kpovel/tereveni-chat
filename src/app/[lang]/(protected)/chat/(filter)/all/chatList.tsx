"use client";
import { MessageContainer } from "@/components/chat/MessageContainer";
import { ChatRoom } from "./chatRooms";
import { useState } from "react";
import { DictionaryReturnTypes } from "@/app/[lang]/dictionaries";

export function ChatList({
  chatList,
  lang,
  dict,
}: {
  dict: Awaited<DictionaryReturnTypes["/en/chat/all"]>;
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
            dict={dict}
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
