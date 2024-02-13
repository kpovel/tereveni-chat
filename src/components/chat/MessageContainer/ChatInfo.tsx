import { ChatRoom } from "@/app/[lang]/(protected)/chat/all/chatRooms";

export function ChatInfo({}: { lastMessage: ChatRoom["lastMessage"] }) {
  return (
    <div
      className="flex flex-col items-end justify-between pt-1 text-[11px] leading-normal"
      style={{
        fontFeatureSettings: "'clig' off, 'liga' off",
      }}
    >
      <div className="text-[#79767A]">11:24 AM</div>
      <div className="min-w-[18px] rounded-2xl bg-[#9D83F9] px-1.5 text-center shadow-[0px_8px_10px_1px_rgba(0,_0,_0,_0.12)]">
        69
      </div>
    </div>
  );
}

function formatTime(time: string) {
  // todo
}
