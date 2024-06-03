"use server";

import { env } from "@/env.mjs";
import { getJwtAccessToken } from "../../regenerateAccessToken";
import { Message } from "./page";

const PAGE_SIZE = 20;

export async function loadPreviousMessages(chatId: string, messageId: number) {
  const jwtAccessToken = await getJwtAccessToken();
  const res = await fetch(
    `${env.SERVER_URL}/api/page/messages/chat-room/${chatId}?messageId=${messageId}&size=${PAGE_SIZE}`,
    {
      headers: {
        Authorization: `Bearer ${jwtAccessToken}`,
      },
    },
  );

  const messages = (await res.json()) as Message[];
  return { messages: messages, end: messages.length < PAGE_SIZE };
}
