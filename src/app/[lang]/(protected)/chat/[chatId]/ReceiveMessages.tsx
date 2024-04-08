"use server"

import { getJwtAccessToken } from "../../regenerateAccessToken";
import MessagesField from "./messagesField";
import MessageInput from "./messageInput";
import { ChatRoom } from './messageService'
import { ModalContentType } from "@/components/chat/ModalContainer/ModalContainer";
import { env } from "@/env.mjs";

export type Message = {
  uuid: string;
  content: string;
  user: {
    uiid: string;
    name: string;
    image: {
      name: string;
    };
    dateOfCreated: string;
  };
  dateOfCreated: string;
};

export type ChatRoom = {
  uuid: string;
  description: string | null;
  messages: Message[];
  image: { name: string };
  currentChatUserUIID: string;
};

export async function ReceiveMessages({ 
    chatId,
    openModal,
    modalContent,
    hideModal
 }: { 
    chatId: string 
    openModal: (content: ModalContentType) => void;
    modalContent: ModalContentType;
    hideModal: () => void;
}) {
  const jwtAccessToken = await getJwtAccessToken();
  const res = await fetch(`${env.SERVER_URL}/api/get-chat-room/${chatId}`, {
    headers: {
      Authorization: `Bearer ${jwtAccessToken}`,
    },
  });

  const json = (await res.json()) as ChatRoom;

//   if(res.status === 200){
//       return json
//   }

    return (
        <>
            <MessagesField
                messagesInit={json.messages}
                currentChatUserUIID={json.currentChatUserUIID}
                chatId={chatId}
                jwtAccessToken={jwtAccessToken}
                openModal={openModal}
                modalContent={modalContent}
                hideModal={hideModal}
            />
            <MessageInput />
        </>
    )
}