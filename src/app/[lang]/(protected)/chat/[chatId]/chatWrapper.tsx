"use client"

import { useState, ReactNode } from "react";
import MessagesField from "./messagesField";
import PrivateChatHeader from "./privateChatHeader";
import MessageInput from "./messageInput";

export default function ChatWrapper(){

    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ modalContent, setModalContent ] = useState<ReactNode | null>(null)

    function hideModal() {
        setIsModalOpen(false)
    }

    function openModal(content: ReactNode) {
        setIsModalOpen(true)
        setModalContent(content)
    }

    return (
    <div className="flex h-dvh w-screen flex-col">
      <PrivateChatHeader openModal={openModal} />
      <MessagesField modalContent={modalContent} hideModal={hideModal} isModalOpen={isModalOpen}/>
      <MessageInput />
    </div>
    )
}
