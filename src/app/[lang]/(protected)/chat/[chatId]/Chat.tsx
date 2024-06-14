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
export function Chat(props: { chatRoom: ChatRoom; pagination: boolean }) {
  const chatRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!props.pagination) {
      return;
    }

    const current = chatRef.current;
    if (!current) {
      return;
    }

    async function scrollListener() {
      if (!current) {
        return;
      }
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
    }

    current.addEventListener("scroll", scrollListener);

    return () => {
      current.removeEventListener("scroll", scrollListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.pagination]);

  return (
    <section
      id="chat"
      ref={chatRef}
      className="flex grow flex-col-reverse gap-5 overflow-scroll px-6 pb-5"
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
  const messageSent = new Date(props.message.dateOfCreated);
  const localHours =
    messageSent.getUTCHours() + messageSent.getTimezoneOffset() / -30;
  const hours = localHours > 24 ? localHours - 24 : localHours;

  return (
    <div
      className={
        "flex items-center justify-end gap-1 " +
        (messageByCurrentUser ? "" : "flex-row-reverse")
      }
      id={props.message.id.toString()}
    >
      {hours}:{String(messageSent.getUTCMinutes()).padStart(2, "0")}
      <div
        id={props.message.id.toString()}
        className="rounded-2xl bg-[#7C01F6] px-3 py-2"
      >
        {props.message.content}
      </div>
    </div>
  );
}
