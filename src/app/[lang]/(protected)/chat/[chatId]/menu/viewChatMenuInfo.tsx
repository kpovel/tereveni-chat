"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { DictionaryReturnTypes } from "@/app/[lang]/dictionaries";
import { ModalContext } from "../privateChatHeader";
import ChatMenuHeader from "./menu-header/chatMenuHeader";
import ChatMenuDescription from "./chat-description/chatMenuDescription";
import ChatMenuOptions from "./chat-options/chatMenuOptions";
import { ModalContentType } from "@/components/chat/ModalContainer/ModalContainer";
import ConfirmationDeleting from "@/components/chat/ModalContainer/ModalContent/ConfirmationDeleting";
import CompleteDeleting from "@/components/chat/ModalContainer/ModalContent/CompleteDeleting";

export default function ViewChatMenuInfo({
  dict,
  description,
  setEditModeActive,
  chatId,
}: {
  dict: Awaited<DictionaryReturnTypes["/en/chat/menu"]>;
  description: string;
  setEditModeActive: () => void;
  chatId: string;
}) {
  const [modalContent, setModalContent] = useState<ModalContentType>(null);

  return (
    <div>
      <ModalContext.Provider value={{ modalContent, setModalContent }}>
        <ChatMenuHeader dict={dict} setEditModeActive={setEditModeActive} />
        <ChatMenuDescription />
        <ChatMenuOptions dict={dict} chatId={chatId} />
      </ModalContext.Provider>
      <Modal
        modalContent={modalContent}
        setModalContent={setModalContent}
        dict={dict}
      />
    </div>
  );
}

export function Modal({
  modalContent,
  setModalContent,
  dict,
}: {
  modalContent: ModalContentType;
  setModalContent: (content: ModalContentType) => void;
  dict: Awaited<DictionaryReturnTypes["/en/chat/menu"]>;
}) {
  const params = useParams<{ lang: Lang; chatId: string }>();

  if (modalContent === "ConfirmationDeleting") {
    return (
      <div className="absolute left-0 top-0 flex h-dvh w-dvw flex-col items-center justify-center backdrop-blur-[3px]">
        <ConfirmationDeleting
          chatRoomUuid={params.chatId}
          lang={params.lang}
          openModal={setModalContent}
          dict={dict.modal.confirmationDeleting}
        />
      </div>
    );
  }
  if (modalContent === "CompleteDeleting") {
    return (
      <div className="absolute left-0 top-0 flex h-dvh w-dvw flex-col items-center justify-center backdrop-blur-[3px]">
        <CompleteDeleting>{dict.modal.completeDeleting}</CompleteDeleting>
      </div>
    );
  }
}
