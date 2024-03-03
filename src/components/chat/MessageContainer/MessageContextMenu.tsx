import {
  ReactNode,
  MouseEvent,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { ChatRoom } from "@/app/[lang]/(protected)/chat/all/chatRooms";
import { MessageContextList } from "./MessageContextList";
import { useClickOutside } from "@/util/useClickOutside";

export function MessageContextMenu({
  children,
  chatRoom,
  setSelectedChat,
  selectedChat,
}: {
  children: ReactNode;
  setSelectedChat: Dispatch<SetStateAction<string | null>>;
  selectedChat: string | null;
  chatRoom: ChatRoom;
}) {
  const ref = useClickOutside<HTMLDivElement>(hideContextMenu);
  const openContext = selectedChat === chatRoom.chatRoom.uuid;

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

  return (
    <div ref={ref} onContextMenu={handleContextMenu}>
      {children}
      <MessageContextList openContext={openContext} />
    </div>
  );
}
