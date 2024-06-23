import ChatMenuHeader from "./menu-header/chatMenuHeader";
import ChatMenuDescription from "./chat-description/chatMenuDescription";
import ChatMenuOptions from "./chat-options/chatMenuOptions";

export default function ViewChatMenuInfo({setEditModeActive, chatId}:any) {
    return (
        <div>
            <ChatMenuHeader setEditModeActive={setEditModeActive}/>
            <ChatMenuDescription />
            <ChatMenuOptions chatId={chatId} />
        </div>
    )
}