import { ChatRoom } from "@/app/[lang]/(protected)/chat/all/chatRooms";
import Link from "next/link";
import { ChatAvatar } from "./ChatAvatar";
import { ChatInfo } from "./ChatInfo";
import { Dispatch, SetStateAction, useRef, MouseEvent, useEffect } from "react";

export function MessageContainer({
  chatRoom,
  lang,
  setSelectedChat,
  selectedChat,
}: {
  chatRoom: ChatRoom;
  lang: Lang;
  setSelectedChat: Dispatch<SetStateAction<string>>;
  selectedChat: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  function handleContextMenu(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    setSelectedChat(chatRoom.chatRoom.uuid);
  }

  useEffect(() => {
    if (selectedChat === "") {
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
    <Link
      href={`/${lang}/chat/${chatRoom.chatRoom.uuid}`}
      ref={ref}
      onContextMenu={handleContextMenu}
      className="flex gap-3 rounded-2xl bg-[rgba(255,_255,_255,_0.05)] p-3
        shadow-[0px_8px_10px_1px_rgba(0,_0,_0,_0.12)]"
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
    </Link>
  );
}
