"use client";

import { DictionaryReturnTypes } from "@/app/[lang]/dictionaries";
import { env } from "@/env.mjs";
import { Client } from "@stomp/stompjs";
import Image from "next/image";
import AddFile from "public/chat/add-file.svg";
import { ChatRoom, Message as MessageT } from "./page";
import { useEffect } from "react";
import { Message } from "./Chat";

export function ChatInput(props: {
  dict: Awaited<DictionaryReturnTypes["/en/chat"]>;
  jwtAccessToken: string;
  chatRoom: ChatRoom;
}) {
  useEffect(() => {
    const form = document.getElementById("form") as HTMLFormElement;
    const chat = document.getElementById("chat")!;

    const stopmClient = new Client({
      brokerURL: env.NEXT_PUBLIC_SERVER_WS_URL + "/ws",
    });

    stopmClient.onConnect = () => {
      stopmClient.subscribe(
        `/topic/${props.chatRoom.uuid}`,
        async (message) => {
          const body = JSON.parse(message.body) as MessageT;
          const myMessage =
            body.user.uuid === props.chatRoom.currentChatUserUUID;

          const ReactDOMServer = (await import("react-dom/server")).default;
          const staticMarkup = ReactDOMServer.renderToStaticMarkup(
            <Message
              message={body}
              currentChatUserUUID={props.chatRoom.currentChatUserUUID}
            />,
          );
          chat.insertAdjacentHTML("afterbegin", staticMarkup);
          if (myMessage) {
            chat.scrollBy({ top: chat.scrollHeight, behavior: "smooth" });
          }
        },
      );
    };
    stopmClient.activate();

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(e.target as any);
      const message = data.get("message")!;

      stopmClient.publish({
        destination: `/app/hello/${props.chatRoom.uuid}`,
        headers: {
          authorization: `Bearer ${props.jwtAccessToken}`,
        },
        body: JSON.stringify({
          currentChatUserUUID: props.chatRoom.currentChatUserUUID,
          content: message,
          edited: false,
        }),
      });

      form.reset();
    });

    return () => {
      stopmClient.deactivate();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="flex gap-2 bg-[#1F1F1F] py-2 pl-4 pr-6">
      <Image src={AddFile} alt="Add file icon" />
      <form id="form" className="w-full">
        <input
          name="message"
          placeholder={props.dict.placeholder.enterMessage}
          className="w-full rounded-2xl bg-[#545454] px-4 py-2 outline-none"
        />
      </form>
    </section>
  );
}
