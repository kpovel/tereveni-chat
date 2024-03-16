"use client";

import { useState } from "react";
import MessagesField from "./messagesField";
import PrivateChatHeader from "./privateChatHeader";
import MessageInput from "./messageInput";
import { ModalContentType } from "@/components/chat/ModalContainer/ModalContainer";

export default function ChatWrapper() {
  const [modalContent, setModalContent] = useState<ModalContentType>(null);

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
      />
      <MessageInput />
    </div>
  );
}
