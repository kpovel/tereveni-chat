"use server";

import { env } from "@/env.mjs";
import { getJwtAccessToken } from "../../../regenerateAccessToken";

export async function putUserHashtags(
  lang: Lang,
  checkedCategories: { id: number }[],
) {
  const jwtAccessToken = await getJwtAccessToken();

  await fetch(`${env.SERVER_URL}/api/user/hashtags`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${jwtAccessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(checkedCategories),
  });
}
