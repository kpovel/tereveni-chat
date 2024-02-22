import { ChatRoom } from "@/app/[lang]/(protected)/chat/all/chatRooms";
import Link from "next/link";
import { ChatAvatar } from "./ChatAvatar";
import { ChatInfo } from "./ChatInfo";

export function MessageContainer({
  chatRoom,
  lang,
}: {
  chatRoom: ChatRoom;
  lang: Lang;
}) {
  return (
    <Link
      href={`/${lang}/chat/${chatRoom.chatRoom.uuid}`}
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
