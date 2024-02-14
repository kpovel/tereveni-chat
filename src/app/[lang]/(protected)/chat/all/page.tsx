import { MessageContainer } from "@/components/chat/MessageContainer";
import { getChatRooms } from "./chatRooms";
import { handleUnsupportedLang } from "@/util/handleUnsupportedLang";

export default async function AllChats({ params }: { params: { lang: Lang } }) {
  handleUnsupportedLang(params.lang);

  const chatRooms = await getChatRooms();

  if (chatRooms.err) {
    return <div>{chatRooms.err}</div>;
  }

  return (
    <div className="flex flex-col gap-5 px-6">
      {chatRooms.ok?.map((chatRoom) => {
        return (
          <MessageContainer
            key={chatRoom.chatRoom.uuid}
            chatRoom={chatRoom}
            lang={params.lang}
          />
        );
      })}
    </div>
  );
}
