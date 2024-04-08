"use client";

import { useState, useEffect } from "react";
import MessagesField from "./messagesField";
import PrivateChatHeader from "./privateChatHeader";
import MessageInput from "./messageInput";
import { Message } from "./page";
import { Client, Subscription } from "@stomp/stompjs";
// import { ReceiveMessages } from "./ReceiveMessages";
import { ModalContentType } from "@/components/chat/ModalContainer/ModalContainer";

export default function ChatWrapper({
  chatId,
  messagesInit,
  currentChatUserUUID,
  jwtAccessToken
}:{
  chatId: string;
  messagesInit: any;
  currentChatUserUUID: string;
  jwtAccessToken: string
}) {
  console.log(messagesInit)
  const [ modalContent, setModalContent ] = useState<ModalContentType>(null);
  const [ receiveMessages, setReceiveMessages ] = useState<Message[]>([])
  const [ clientSubscription, setClientSubscription ] = useState<Subscription | null>(null)


  const [client, setClient] = useState<Client | null>(null);

  const newClient = new Client({
    brokerURL: `ws://138.68.69.149:8080/ws`
  })


  useEffect(() => {
    setReceiveMessages([...messagesInit])

    newClient.onConnect = () => {
      const subscription = newClient.subscribe(`/topic/${chatId}`, (message:any) => {
        const body = JSON.parse(message.body) as Message;
        setReceiveMessages(prevMessages => [body, ...prevMessages]);
      });
    }
    // setClientSubscription(subscription);


  // const newClient = new Client({
  //   brokerURL: `ws://138.68.69.149:8080/ws`,
  //   onConnect: () => {

  //     const subscription = newClient.subscribe(`/topic/${chatId}`, (message:any) => {
  //       const body = JSON.parse(message.body) as Message;
  //       setReceiveMessages(prevMessages => [body]);
  //     });

      


      // newClient.subscribe(`/topic/${chatId}`, (message:any) => {
      //   const body = JSON.parse(message.body) as Message;
      //   console.log(body)
      //   setReceiveMessages(prevMessages => [body, ...prevMessages]);
      // });
      // newClient.publish({
      //   destination: `/app/hello/${chatId}`,
      //   body: "First Message",
      // });
  //   },
  // });

  newClient.activate();

  setClient(newClient);

  return () => {
    if (clientSubscription) {
      clientSubscription.unsubscribe();
    }
    if (newClient && newClient.connected) {
      newClient.deactivate();
    }
  };

  }, [])

  function hideModal() {
    setModalContent(null);
  }

  function openModal(content: ModalContentType) {
    setModalContent(content);
  }

  const sendMessage = (message: string) => {
    if (client && client.connected) {
        client.publish({
            destination: `/app/hello/${chatId}`,
            headers: {
              'authorization': `Bearer ${jwtAccessToken}`
            },
            body: JSON.stringify({
                    currentChatUserUUID: currentChatUserUUID,
                    content: message,
                    edited: false
                  }),
        });
    }
};

  return (
    <div className="flex h-dvh w-screen flex-col">
      <PrivateChatHeader openModal={openModal} />
      <MessagesField
        chatId={chatId}
        openModal={openModal}
        modalContent={modalContent}
        hideModal={hideModal}
        receiveMessages={receiveMessages}
      />
      <MessageInput 
        sendMessage={sendMessage} 
      />

    </div>
  );
}
