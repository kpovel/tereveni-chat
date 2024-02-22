import MessagesField from "./messagesField";
import PrivateChatHeader from "./privateChatHeader";
import MessageInput from "./messageInput";

export default async function ChatID({ params }: { params: { lang: Lang } }) {
  return (
    <div className="mx-auto h-screen max-h-[600px] max-w-[390px] flex-col justify-between">
      <PrivateChatHeader />
      <MessagesField />
      <MessageInput />
    </div>
  );
}
