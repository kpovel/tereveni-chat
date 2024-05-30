"use client";

import { useEffect, useRef } from "react";
import { ChatRoom, Message as MessageT } from "./page";
import { loadPreviousMessages } from "./fetchingMessages";

function isScrolledToTop(el: HTMLElement) {
  return -el.scrollTop === el.scrollHeight - el.clientHeight;
}

function lastMessageId(el: HTMLElement) {
  const lastMessage = el.lastElementChild!;
  return lastMessage.id;
}

async function messagesToString(
  messages: MessageT[],
  currentChatUserUUID: string,
) {
  const ReactDOMServer = (await import("react-dom/server")).default;
  const staticMarkup = ReactDOMServer.renderToString(
    <>
      {messages.map((m) => {
        return (
          <Message
            key={m.uuid}
            message={m}
            currentChatUserUUID={currentChatUserUUID}
          />
        );
      })}
    </>,
  );

  return staticMarkup;
}

let messagesEnd = false;
export function Chat(props: { chatRoom: ChatRoom }) {
  const chatRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const current = chatRef.current;
    if (!current) {
      return;
    }

    current.addEventListener("scroll", async () => {
      if (isScrolledToTop(current) && !messagesEnd) {
        const lastId = lastMessageId(current);
        let json = await loadPreviousMessages(
          props.chatRoom.uuid,
          Number(lastId),
        );

        messagesEnd = json.end;
        const messages = await messagesToString(
          json.messages,
          props.chatRoom.currentChatUserUUID,
        );
        current.insertAdjacentHTML("beforeend", messages);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      id="chat"
      ref={chatRef}
      className="flex grow flex-col-reverse gap-5 overflow-scroll"
    >
      {props.chatRoom.messages.map((m) => {
        return (
          <Message
            message={m}
            key={m.id}
            currentChatUserUUID={props.chatRoom.currentChatUserUUID}
          />
        );
      })}
    </section>
  );
}

export function Message(props: {
  message: MessageT;
  currentChatUserUUID: string;
}) {
  const messageByCurrentUser =
    props.currentChatUserUUID === props.message.user.uuid;
  return (
    <div className="flex justify-end" id={props.message.id.toString()}>
      <div
        id={props.message.id.toString()}
        className="rounded-2xl bg-[#7C01F6] px-3 py-2"
      >
        {props.message.content}
      </div>
    </div>
  );
}
