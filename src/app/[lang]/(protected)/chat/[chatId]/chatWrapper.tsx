"use client";

import {
  useState,
  ReactNode,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import MessagesField from "./messagesField";
import PrivateChatHeader from "./privateChatHeader";
import MessageInput from "./messageInput";

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
  const [modalContent, setModalContent] = useState<null | string>(null);

  function hideModal() {
    setIsModalOpen(false);
  }

  function openModal(content: null | string) {
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
