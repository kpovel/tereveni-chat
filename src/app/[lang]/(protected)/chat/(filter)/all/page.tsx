import { EmptyChatListMessage } from "@/components/chat/EmptyChatListMessage";
import { ChatList } from "./chatList";
import { getChatRooms } from "./chatRooms";
import { getDictionary } from "@/app/[lang]/dictionaries";

export default async function AllChats({ params }: { params: { lang: Lang } }) {
  const dict = await getDictionary(`/${params.lang}/chat/all`);
  const chatRooms = await getChatRooms();

  if (chatRooms.err) {
    return <div>{chatRooms.err}</div>;
  }

  if (chatRooms.ok?.length === 0) {
    return (
      <div className="flex grow flex-col justify-center px-6">
        <EmptyChatListMessage lang={params.lang} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 px-6">
      <ChatList chatList={chatRooms.ok!} lang={params.lang} dict={dict} />
    </div>
  );
}
