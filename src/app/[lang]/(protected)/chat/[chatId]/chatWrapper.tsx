"use client";

import { useState, useEffect } from "react";
import { useParams } from 'next/navigation';
import MessagesField from "./messagesField";
import PrivateChatHeader from "./privateChatHeader";
import MessageInput from "./messageInput";
import { ModalContentType } from "@/components/chat/ModalContainer/ModalContainer";

export default function ChatWrapper() {
  const [ modalContent, setModalContent ] = useState<ModalContentType>(null);
  const [ chatUuid, setChatUuid ] = useState<null | string>(null);

  // const params = useParams<{ tag: string; item: string }>()

  // useEffect(() => {
  //   setChatUuid(params.chatId);
  // }, [params.chatId])

  // console.log(`ChatWrapper - ${params.lang}`)

  function hideModal() {
    setModalContent(null);
  }

  function openModal(content: ModalContentType) {
    setModalContent(content);
  }

  return (
    <div className="flex h-dvh w-screen flex-col">
      <PrivateChatHeader openModal={openModal} />
      <MessagesField
        openModal={openModal}
        modalContent={modalContent}
        hideModal={hideModal}
        // chatRoomUuid={params.chatId}
        // lang={params.lang}
      />
      <MessageInput />
    </div>
  );
}
