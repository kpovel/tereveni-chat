"use server";

import { getJwtAccessToken } from "@/app/[lang]/(protected)/regenerateAccessToken";
import { FormState } from "./DescriptionForm";
import { env } from "@/env.mjs";
import { redirect } from "next/navigation";

export async function sumbitDescription(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const jwtAccessToken = await getJwtAccessToken();
  const lang = formData.get("lang");
  const chatUUID = formData.get("chatUUID");

  const res = await fetch(
    `${env.SERVER_URL}/api/public-chat-room/edit-description?lang=${lang}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${jwtAccessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        uuid: chatUUID,
        chatRoomDescription: formData.get("description"),
      }),
    },
  );

  if (res.status === 200) {
    redirect(`/${lang}/chat/${chatUUID}`);
  }

  return {
    description: "",
  };
}
