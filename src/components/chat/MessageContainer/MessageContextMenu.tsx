import {
  ReactNode,
  MouseEvent,
  Dispatch,
  SetStateAction,
  useEffect,
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
  lang,
  modalContent,
  setSelectedChat,
  selectedChat,
  setModalContent,
  setDisableScroll,
}: {
  children: ReactNode;
  lang: string;
  chatRoom: ChatRoom;
  selectedChat: string | null;
  setSelectedChat: Dispatch<SetStateAction<string | null>>;
  modalContent: ModalContentType;
  setModalContent: Dispatch<SetStateAction<ModalContentType>>;
  setDisableScroll: Dispatch<SetStateAction<boolean>>;
}) {
  const chatContextMenuRef =
    useClickOutside<HTMLDivElement>(hideChatContextMenu);
  const modalCotainerRef = useClickOutside<HTMLDivElement>(hideModal);
  const openContext = selectedChat === chatRoom.chatRoom.uuid;

  function hideModal() {
    setModalContent(null);
    setDisableScroll(false);
  }

  function openModal(content: ModalContentType) {
    setModalContent(content);
    setSelectedChat(null);
  }

  function hideChatContextMenu() {
    if (openContext) {
      setSelectedChat(null);
      chatContextMenuRef.current?.classList.remove("blur-sm");
      setDisableScroll(false);
    }
  }

  function handleContextMenu(e: MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    setSelectedChat(chatRoom.chatRoom.uuid);
    setDisableScroll(true);
  }

  useEffect(() => {
    if (selectedChat === null) {
      chatContextMenuRef.current?.classList.remove("blur-sm");
      return;
    }

    if (openContext) {
      chatContextMenuRef.current?.classList.remove("blur-sm");
      return;
    }

    chatContextMenuRef.current?.classList.add("blur-sm");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openContext, selectedChat]);

  return (
    <div ref={chatContextMenuRef} onContextMenu={handleContextMenu}>
      {children}
      <ModalContainer
        openModal={openModal}
        modalType={modalContent}
        chatRoomUuid={chatRoom.chatRoom.uuid}
        lang={lang}
      />
      <MessageContextList openContext={openContext} openModal={openModal} />
    </div>
  );
}
