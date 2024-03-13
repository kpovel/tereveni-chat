"use server";

import { env } from "@/env.mjs";
import { FormState } from "./createChatForm";
import { getJwtAccessToken } from "../../../regenerateAccessToken";
import { langUnwrapOrDefault } from "@/util/lang";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createChat(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const jwtAccessToken = await getJwtAccessToken();
  const submitFormData = new FormData();

  const picture = formData.get("picture") as File | null;
  if (picture && picture.size > 0) {
    const blob = new Blob([picture], { type: picture.type });
    submitFormData.append("file", blob);
  }

  submitFormData.append(
    "chatRoom",
    new Blob([JSON.stringify({ chatRoomName: formData.get("chat") })], {
      type: "application/json",
    }),
  );

  const res = await fetch(`${env.SERVER_URL}/api/public-chat-room/create`, {
    method: "POST",
    body: submitFormData,
    headers: {
      Authorization: `Bearer ${jwtAccessToken}`,
    },
  });

  if (res.status === 200) {
    const json = (await res.json()) as SuccessResponse;
    const cookieLang = cookies().get("lang")?.value ?? "en";
    const lang = await langUnwrapOrDefault(cookieLang);
    redirect(`/${lang}/chat/create/${json.uuid}/hashtag`);
  }

  if (res.status === 400) {
    const json = (await res.json()) as ErrorResponse;
    if (json.general) {
      return {
        input: "",
        image: json.general,
      };
    }

    return {
      input: json.chatRoomName!,
      image: "",
    };
  }

  return {
    image: "",
    input: "Internal server error",
  };
}

type SuccessResponse = {
  uuid: string;
  name: string;
  description: string | null;
  image: { name: string };
  currentChatUserUUID: string | null;
};

type ErrorResponse = {
  chatRoomName?: string;
  general?: string;
};
