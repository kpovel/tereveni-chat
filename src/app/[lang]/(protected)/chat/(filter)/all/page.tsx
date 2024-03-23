import { ChatList } from "./chatList";
import { getChatRooms } from "./chatRooms";

export default async function AllChats({ params }: { params: { lang: Lang } }) {
  const chatRooms = await getChatRooms();

  if (chatRooms.err) {
    return <div>{chatRooms.err}</div>;
  }
  
  return (
    <div className="flex flex-col gap-5 px-6">
      <ChatList chatList={chatRooms.ok!} lang={params.lang} />
    </div>
  );
}
