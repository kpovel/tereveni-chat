import { env } from "@/env.mjs";
import { getJwtAccessToken } from "../../../regenerateAccessToken";

export type ChatRoom = {
  chatName: string;
  chatRoom: {
    uuid: string;
    description: string;
    image: null | { name: string };
  };
  lastMessage: null | { uuid: string; content: string; dateOfCreated: string };
};

type ChatRoomResult = {
  ok: ChatRoom[] | undefined;
  err: string | undefined;
};

export async function getChatRooms(): Promise<ChatRoomResult> {
  const jwtAccessToken = await getJwtAccessToken();
  const res = await fetchChatRooms(jwtAccessToken);

  if (res.status === 200) {
    return {
      ok: await res.json(),
      err: undefined,
    } satisfies ChatRoomResult;
  }

  if (res.status === 401) {
    return {
      ok: undefined,
      err: "Unauthorized",
    };
  }

  return {
    ok: undefined,
    err: "Failed to fetch chat rooms",
  };
}

async function fetchChatRooms(jwtAccessToken: string) {
  return await fetch(`${env.SERVER_URL}/api/user/chat-rooms`, {
    headers: {
      Authorization: `Bearer ${jwtAccessToken}`,
    },
  });
}
