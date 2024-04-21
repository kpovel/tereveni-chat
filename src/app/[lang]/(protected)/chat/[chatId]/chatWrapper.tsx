"use client";

import { useState, useEffect } from "react";
import MessagesField from "./messagesField";
import PrivateChatHeader from "./privateChatHeader";
import MessageInput from "./messageInput";
import { DictionaryReturnTypes } from "../../../dictionaries";
import { Message } from "./page";
import { Client, StompSubscription } from "@stomp/stompjs";
import { ModalContentType } from "@/components/chat/ModalContainer/ModalContainer";
import { env } from "@/env.mjs";

export default function ChatWrapper({
  chatId,
  messagesInit,
  currentChatUserUUID,
  jwtAccessToken,
  dict
}: {
  chatId: string;
  messagesInit: any;
  currentChatUserUUID: string;
  jwtAccessToken: string;
  dict: DictionaryReturnTypes
}) {
  const [modalContent, setModalContent] = useState<ModalContentType>(null);
  const [receiveMessages, setReceiveMessages] = useState<Message[]>([]);

  const [client, setClient] = useState<Client | null>(null);
  
  const newClient = new Client({
    brokerURL: env.NEXT_PUBLIC_SERVER_WS_URL + "/ws",
  });

  useEffect(() => {
    setReceiveMessages([...messagesInit]);

    newClient.onConnect = () => {
      newClient.subscribe(`/topic/${chatId}`, (message: any) => {
        const body = JSON.parse(message.body) as Message;
        setReceiveMessages((prevMessages) => [...prevMessages, body]);
      });
    };

    newClient.activate();

    setClient(newClient);

    return () => {
      if (newClient && newClient.connected) {
        newClient.deactivate();
      }
    };
  }, []);

  function hideModal() {
    setModalContent(null);
  }

  function openModal(content: ModalContentType) {
    setModalContent(content);
  }

  const sendMessage = (message: string) => {
    if (client && client.connected) {
      client.publish({
        destination: `/app/hello/${chatId}`,
        headers: {
          authorization: `Bearer ${jwtAccessToken}`,
        },
        body: JSON.stringify({
          currentChatUserUUID: currentChatUserUUID,
          content: message,
          edited: false,
        }),
      });
    }
  };

  return (
    <div className="relative flex h-dvh w-screen flex-col">
      <PrivateChatHeader 
        openModal={openModal} 
        dict={dict}
      />
      <MessagesField
        openModal={openModal}
        modalContent={modalContent}
        hideModal={hideModal}
        receiveMessages={receiveMessages}
        currentChatUserUUID={currentChatUserUUID}
        dict={dict}
      />
      <MessageInput 
        sendMessage={sendMessage} 
        dict={dict}
      />
    </div>
  );
}
