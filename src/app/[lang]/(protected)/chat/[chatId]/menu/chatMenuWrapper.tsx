"use client"

import { useState } from "react";
import ViewChatMenuInfo from "./viewChatMenuInfo";
import EditChatMenuInfo from "./editChatMenuInfo";

export default function ChatMenuWrapper({chatRoom, chatId}: any) {

    const { isAdmin, image, description, currentChatUserUUID } = chatRoom;

    const [ isEditActive, setIsEditActive ] = useState<boolean>(false);

    function setEditModeActive(){
        setIsEditActive(true);
    }
    function disableEditMode(){
        setIsEditActive(false);
    }

    return(
        <div className="w-full px-6 min[]">
            {
                isEditActive ? 
                <EditChatMenuInfo 
                    description={description} 
                    name={currentChatUserUUID} 
                    disableEditMode={disableEditMode}/> 
                    : 
                    <ViewChatMenuInfo 
                        description={description} 
                        chatId={chatId} 
                        setEditModeActive={setEditModeActive} />
            }
        </div>
    )
}