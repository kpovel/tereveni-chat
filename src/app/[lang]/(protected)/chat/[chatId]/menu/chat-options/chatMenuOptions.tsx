import BtnOptions from "./btnOptions";
import BlockedMembers from "public/chat/blocked-members.svg";
import Members from "public/chat/members.svg";
import Trash from "public/chat/trash.svg";

export default function ChatMenuOptions({chatId}: any) {
    return (
        <div className="mt-10 max-w-[70%] mx-auto">
            <BtnOptions img={Members} text={"Members"} href={`/en/chat/${chatId}/menu/members`} />
            <BtnOptions img={BlockedMembers} text={"Blocked members"} href={`/en/chat/${chatId}/menu/blocked-members`} />
            <BtnOptions img={Trash} text={"Delete chat"} href={'null'} />
        </div>
    )
}