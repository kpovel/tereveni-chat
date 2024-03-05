import MessagesField from "./messagesField";
import PrivateChatHeader from "./privateChatHeader";
import MessageInput from "./messageInput";

export default async function ChatID({ params }: { params: { lang: Lang } }) {
  return (
    <div className="flex h-dvh w-screen flex-col">
      <PrivateChatHeader />
      <MessagesField />
      <MessageInput />
    </div>
  );
}
