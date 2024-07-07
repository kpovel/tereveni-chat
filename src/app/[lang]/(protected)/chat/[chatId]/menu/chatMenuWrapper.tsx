"use client";

import { useState } from "react";
import { DictionaryReturnTypes } from "@/app/[lang]/dictionaries";
import ViewChatMenuInfo from "./viewChatMenuInfo";
import EditChatMenuInfo from "./editChatMenuInfo";

export interface ChatMessage {
  chatRoom: {
    uuid: string;
  };
  content: string;
  dateOfCreated: string;
  edited: boolean;
  id: number;
  user: {
    uuid: string;
  };
  uuid: string;
}

interface Image {
  name: string;
}

export interface ChatRoom {
  admin: boolean;
  currentChatUserUUID: string;
  dateOfCreated: string;
  description: string;
  image: Image;
  isAdmin: boolean;
  isJoin: boolean;
  join: boolean;
  messages: ChatMessage[];
  uuid: string;
}

export default function ChatMenuWrapper({
  dict,
  chatRoom,
  chatId,
}: {
  dict: Awaited<DictionaryReturnTypes["/en/chat/menu"]>;
  chatRoom: ChatRoom;
  chatId: string;
}) {
  const { isAdmin, image, description, currentChatUserUUID } = chatRoom;

  const [isEditActive, setIsEditActive] = useState<boolean>(false);

  function setEditModeActive() {
    setIsEditActive(true);
  }
  function disableEditMode() {
    setIsEditActive(false);
  }

  return (
    <div className="min[] w-full px-6">
      {isEditActive ? (
        <EditChatMenuInfo
          dict={dict}
          description={description}
          name={currentChatUserUUID}
          disableEditMode={disableEditMode}
        />
      ) : (
        <ViewChatMenuInfo
          dict={dict}
          description={description}
          chatId={chatId}
          setEditModeActive={setEditModeActive}
        />
      )}
    </div>
  );
}
