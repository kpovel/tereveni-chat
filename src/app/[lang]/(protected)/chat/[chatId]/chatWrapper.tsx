"use client"

import { useState } from "react";
import MessagesField from "./messagesField";
import PrivateChatHeader from "./privateChatHeader";
import MessageInput from "./messageInput";

export default function ChatWrapper(){

    const [ isModalOpen, setIsModalOpen ] = useState(false);

    function hideModal() {
        setIsModalOpen(false)
      }

    return (
    <div className="flex h-dvh w-screen flex-col">
      <PrivateChatHeader openModal={() => setIsModalOpen(true)} />
      <MessagesField hideModal={hideModal} isModalOpen={isModalOpen}/>
      <MessageInput />
    </div>
    )
}
