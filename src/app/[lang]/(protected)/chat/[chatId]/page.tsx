import MessagesField from "./messagesField";
import PrivateChatHeader from "./privateChatHeader";
import MessageInput from "./messageInput";

export default async function ChatID({ params }: { params: { lang: Lang } }) {
  return (
    <div className="flex flex-col h-screen w-screen">
      <PrivateChatHeader />
      <MessagesField />
      <MessageInput />
    </div>
  );
}
