"use client";

import {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import MessagesField from "./messagesField";
import PrivateChatHeader from "./privateChatHeader";
import MessageInput from "./messageInput";
import { ModalContentType } from "@/components/chat/ModalContainer/ModalContainer";

type ModalContextValue = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const ModalContext = createContext<ModalContextValue>({
  isModalOpen: false,
  setIsModalOpen: () => {},
});

export default function ChatWrapper() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContentType>(null);

  function hideModal() {
    setIsModalOpen(false);
  }

  function openModal(content: ModalContentType) {
    setIsModalOpen(true);
    setModalContent(content);
  }

  const modalContextValue: ModalContextValue = {
    isModalOpen,
    setIsModalOpen,
  };

  return (
    <ModalContext.Provider value={modalContextValue}>
      <div className="flex h-dvh w-screen flex-col">
        <PrivateChatHeader openModal={openModal} />
        <MessagesField
          openModal={openModal}
          modalContent={modalContent}
          hideModal={hideModal}
          isModalOpen={isModalOpen}
        />
        <MessageInput />
      </div>
    </ModalContext.Provider>
  );
}
