"use client";

import { MessageContainer } from "@/components/chat/MessageContainer";
import { deleteChat } from "../../delete/deleteChat";
import { ChatRoom } from "./chatRooms";
import { useState } from "react";
import { ModalContentType } from "@/components/chat/ModalContainer/ModalContainer";
// import { useClickOutside } from "@/util/useClickOutside";

export function ChatList({
  chatList,
  lang,
}: {
  chatList: ChatRoom[];
  lang: Lang;
}) {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  // const [modalContent, setModalContent] = useState<ModalContentType>(null);

  // const elemRef = useClickOutside<HTMLDivElement>(hideModal);

  // function hideModal() {
  //   setModalContent(null);
  // }

  // function openModal(content: ModalContentType) {
  //   setModalContent(content);
  // }

  const deleteChatByUiid = (chatRoomUuid: string) => {
    deleteChat(chatRoomUuid);
}

  return (
    <>
      {/* <ModalContainer 
        openModal={openModal}
        childrenElem={modalContent}
        elemRef={elemRef}
      /> */}
      {chatList.map((chatRoom) => {
        return (
          <MessageContainer
            key={chatRoom.chatRoom.uuid}
            deleteChat={deleteChatByUiid}
            chatRoom={chatRoom}
            lang={lang}
            setSelectedChat={setSelectedChat}
            selectedChat={selectedChat}
            
            // openModal={openModal}
            // modalContent={modalContent}
            // hideModal={hideModal}
          />
        );
      })}
    </>
  );
}
