import { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import { useParams } from 'next/navigation';
import RenderMessages from "./renderMessages";
import { useClickOutside } from "@/util/useClickOutside";
import ModalContainer, {
  ModalContentType,
} from "@/components/chat/ModalContainer/ModalContainer";
import { Message } from "./page";
// import { client } from "./messageService";
// import { ReceiveMessages } from './ReceiveMessages';

type RouteParams = {
  lang: string
  chatId: string;
}

export default function MessagesField({
  chatId,
  openModal,
  modalContent,
  hideModal,
  receiveMessages
}: {
  chatId: string;
  openModal: (content: ModalContentType) => void;
  modalContent: ModalContentType;
  hideModal: () => void;
  receiveMessages: Message[]
}) {

  const elemRef = useClickOutside<HTMLDivElement>(hideModal);
  const params = useParams<RouteParams>();

  return (
    <div
      className={`relative h-full ${
        modalContent ? "overflow-hidden" : "overflow-scroll"
      } px-6`}
    >
        <ModalContainer
        openModal={openModal}
        childrenElem={modalContent}
        elemRef={elemRef}
        chatRoomUuid={params.chatId}
        lang={params.lang}
      />
      {!receiveMessages.length && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <p className="text-center text-sm font-normal text-white text-opacity-50">
            No messages here yet
          </p>
        </div>
      )}
      <RenderMessages messages={receiveMessages} />
    </div>
  );
}
