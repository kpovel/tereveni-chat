export interface MessageInterface {
  uuid: string;
  content: string;
  user: {
    uiid: string;
    name: string;
    image: {
      name: string;
    };
    dateOfCreated: string;
  };
  dateOfCreated: string;
}

export default function RenderMessages({
  messages,
}: {
  messages: MessageInterface[];
}) {
  const formatTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex flex-col space-y-5">
      {messages.map((message) => (
        <div
          key={message.uuid}
          className={`relative max-w-[80%] rounded-2xl px-3 py-2 text-sm font-normal ${
            message.uuid === message.user.uiid
              ? "self-end bg-[#7c03f6] text-[#FAFAFA]"
              : "self-start bg-neutral-50 text-[#050404]"
          }`}
        >
          <p>{message.content}</p>
          <div
            className={`absolute bottom-0 text-xs font-light font-bold text-[#C2C2C2] ${
              message.uuid === message.user.uiid
                ? "right-full mr-1"
                : "left-full ml-1"
            }`}
          >
            <span>{formatTime(message.dateOfCreated)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
