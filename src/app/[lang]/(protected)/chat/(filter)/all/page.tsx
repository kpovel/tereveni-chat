import { EmptyChatListMessage } from "@/components/chat/EmptyChatListMessage";
import { ChatList } from "./chatList";
import { getChatRooms } from "./chatRooms";

export default async function AllChats({ params }: { params: { lang: Lang } }) {
  const chatRooms = await getChatRooms();

  if (chatRooms.err) {
    return <div>{chatRooms.err}</div>;
  }

  if (chatRooms.ok?.length === 0) {
    // Here I calculate the height of a chat list to center the message vertically
    return (
      <div className="flex h-[calc(100dvh-75px-92px-40px)] flex-col justify-center px-6">
        <EmptyChatListMessage lang={params.lang} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 px-6">
      <ChatList chatList={chatRooms.ok!} lang={params.lang} />
    </div>
  );
}
