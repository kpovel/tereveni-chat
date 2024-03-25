import {
  ReactNode,
  MouseEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  RefObject,
} from "react";
import { MessageContextList } from "./MessageContextList";
import { useClickOutside } from "@/util/useClickOutside";
import { ChatRoom } from "@/app/[lang]/(protected)/chat/(filter)/all/chatRooms";
import ModalContainer, {
  ModalContentType,
} from "../ModalContainer/ModalContainer";

export function MessageContextMenu({
  children,
  chatRoom,
  setSelectedChat,
  selectedChat,
  lang
}: {
  children: ReactNode;
  setSelectedChat: Dispatch<SetStateAction<string | null>>;
  selectedChat: string | null;
  chatRoom: ChatRoom;
  lang: string
}) {
  const ref = useClickOutside<HTMLDivElement>(hideContextMenu);
  const openContext = selectedChat === chatRoom.chatRoom.uuid;

  const [modalContent, setModalContent] = useState<ModalContentType>(null);
  const elemRef: RefObject<HTMLDivElement> =
    useClickOutside<HTMLDivElement>(hideModal);

  function hideModal() {
    setModalContent(null);
  }

  function openModal(content: ModalContentType) {
    setModalContent(content);
  }

  function hideContextMenu() {
    ref.current?.classList.remove("blur-sm");
    setSelectedChat(null);
  }

  function handleContextMenu(e: MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    setSelectedChat(chatRoom.chatRoom.uuid);
  }

  useEffect(() => {
    if (selectedChat === null) {
      ref.current?.classList.remove("blur-sm");
      return;
    }

    if (selectedChat === chatRoom.chatRoom.uuid) {
      ref.current?.classList.remove("blur-sm");
      return;
    }

    ref.current?.classList.add("blur-sm");
  }, [selectedChat]);

  return (
    <div ref={ref} onContextMenu={handleContextMenu}>
      {children}
      <ModalContainer
        openModal={openModal}
        childrenElem={modalContent}
        elemRef={elemRef}
        chatRoomUuid={chatRoom.chatRoom.uuid}
        lang={lang}
      />
      <MessageContextList
        chatRoomUuid={selectedChat}
        openContext={openContext}
        openModal={openModal}
        modalContent={modalContent}
        hideModal={hideModal}
      />
    </div>
  );
}
