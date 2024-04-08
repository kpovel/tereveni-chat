import { Client } from "@stomp/stompjs";

// export const client = new Client({
//     brokerURL: `ws://138.68.69.149:8080/ws`,
//     onConnect: () => {
//       client.subscribe(`/topic/${chatId}`, (message) => {
//         const body = JSON.parse(message.body) as Message;
//         setMessages([...messages, body]);
//       });
//       client.publish({
//         destination: `/app/hello/${chatId}`,
//         body: "First Message",
//       });
//     },
//   });

export function newStompClient(chatId, message, messages, setMessages){
    const client = new Client({
        brokerURL: `ws://138.68.69.149:8080/ws`,
        onConnect: () => {
          client.subscribe(`/topic/${chatId}`, (message) => {
            const body = JSON.parse(message.body) as Message;
            setMessages([...messages, body]);
          });
          client.publish({
            destination: `/app/hello/${chatId}`,
            body: "First Message",
          });
        },
      });

      return client
}

export type ChatRoom = {
    uuid: string;
    description: string | null;
    messages: Message[];
    image: { name: string };
    currentChatUserUIID: string;
  };

// client.activate();

export function sendMessage(client, chatId, currentChatUserUIID, jwtAccessToken, content, edited) {
    client.publish({
      destination: `/app/hello/${chatId}`,
      body: JSON.stringify({
        currentChatUserUIID,
        content: "asdf",
        edited: false,
        Authorization: `Bearer ${jwtAccessToken}`,
      }),
    });
  }
