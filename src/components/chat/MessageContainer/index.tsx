import {useState} from "react";
import Link from "next/link";
import { ChatAvatar } from "./ChatAvatar";
import { ChatInfo } from "./ChatInfo";
import { ChatRoom } from "@/app/[lang]/(protected)/chat/(filter)/all/chatRooms";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { MessageContextMenu } from "./MessageContextMenu";
import { ModalContentType } from "../ModalContainer/ModalContainer";
// import { useClickOutside } from "@/util/useClickOutside";

export function MessageContainer({
  deleteChat,
  chatRoom,
  lang,
  setSelectedChat,
  selectedChat,

  // openModal,
  // modalContent,
  // hideModal
}: {
  deleteChat: (chatRoomUuid: string | null) => void
  chatRoom: ChatRoom;
  lang: Lang;
  setSelectedChat: Dispatch<SetStateAction<string | null>>;
  selectedChat: string | null;

  // openModal: (content: ModalContentType) => void;
  // modalContent: ModalContentType;
  // hideModal: () => void;
}) {
// console.log(`MessageContainer - ${selectedChat}`)
  //   const [modalContent, setModalContent] = useState<ModalContentType>(null);
  // const elemRef = useClickOutside<HTMLDivElement>(hideModal);

  // function hideModal() {
  //   setModalContent(null);
  // }

  // function openModal(content: ModalContentType) {
  //   setModalContent(content);
  // }

  return (
    <MessageContextMenu
      deleteChat={deleteChat}
      setSelectedChat={setSelectedChat}
      selectedChat={selectedChat}
      chatRoom={chatRoom}
      
      // openModal={openModal}
      // modalContent={modalContent}
      // hideModal={hideModal}
    >

{/* <ModalContainer openModal={openModal}
        childrenElem={modalContent}
        elemRef={elemRef}/> */}

      <RemoveLinkOnBlur
        chatRoom={chatRoom}
        lang={lang}
        selectedChat={selectedChat}
      >
        <ChatAvatar
          imageName={chatRoom.chatRoom.image?.name}
          chatName={chatRoom.chatName}
        />
        <div className="w-0 grow space-y-1 text-wrap">
          <h3 className="line-clamp-1 overflow-hidden text-base">
            {chatRoom.chatName}
          </h3>
          <h4 className="line-clamp-2 overflow-hidden">
            {chatRoom.lastMessage?.content ??
              "Hey! What's up? I will be waiting for you after my math classes. Just phone me."}
          </h4>
        </div>
        <ChatInfo lastMessage={chatRoom.lastMessage} />
      </RemoveLinkOnBlur>
    </MessageContextMenu>
  );
}

function RemoveLinkOnBlur({
  children,
  selectedChat,
  chatRoom,
  lang,
}: {
  children: ReactNode;
  selectedChat: string | null;
  lang: Lang;
  chatRoom: ChatRoom;
}) {
  if (selectedChat === null) {
    return (
      <Link
        href={`/${lang}/chat/${chatRoom.chatRoom.uuid}`}
        className="flex gap-3 rounded-2xl bg-[rgba(255,_255,_255,_0.05)] p-3
        shadow-[0px_8px_10px_1px_rgba(0,_0,_0,_0.12)]"
      >
        {children}
      </Link>
    );
  }

  return (
    <div
      className="flex select-none gap-3 rounded-2xl bg-[rgba(255,_255,_255,_0.05)]
      p-3 shadow-[0px_8px_10px_1px_rgba(0,_0,_0,_0.12)]"
    >
      {children}
    </div>
  );
}
