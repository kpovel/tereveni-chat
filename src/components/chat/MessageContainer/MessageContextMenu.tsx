import {
  ReactNode,
  MouseEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  RefObject
} from "react";
import { MessageContextList } from "./MessageContextList";
import { useClickOutside } from "@/util/useClickOutside";
import { ChatRoom } from "@/app/[lang]/(protected)/chat/(filter)/all/chatRooms";
import ModalContainer, { ModalContentType } from "../ModalContainer/ModalContainer";

export function MessageContextMenu({
  deleteChat,
  children,
  chatRoom,
  setSelectedChat,
  selectedChat,

  // openModal,
  // modalContent,
  // hideModal
}: {
  deleteChat: (chatRoomUuid: string | null) => void
  children: ReactNode;
  setSelectedChat: Dispatch<SetStateAction<string | null>>;
  selectedChat: string | null;
  chatRoom: ChatRoom;

  // openModal: (content: ModalContentType) => void;
  // modalContent: ModalContentType;
  // hideModal: () => void;
}) {
  const ref = useClickOutside<HTMLDivElement>(hideContextMenu);
  const openContext = selectedChat === chatRoom.chatRoom.uuid;

  const [modalContent, setModalContent] = useState<ModalContentType>(null);
  const elemRef: RefObject<HTMLDivElement> = useClickOutside<HTMLDivElement>(hideModal);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat]);

  // console.log(`MessageContextMenu - ${selectedChat}`)

  return (
      <div ref={ref} onContextMenu={handleContextMenu}>
        {children}
        <ModalContainer
          deleteChat={deleteChat}
          openModal={openModal}
          childrenElem={modalContent}
          elemRef={elemRef}
          chatRoomUuid={chatRoom.chatRoom.uuid}
        />
        <MessageContextList 
          // deleteChat={deleteChat} 
          chatRoomUuid={selectedChat} 
          openContext={openContext} 

          openModal={openModal}
          modalContent={modalContent}
          hideModal={hideModal}
        />
      </div>
  );
}
