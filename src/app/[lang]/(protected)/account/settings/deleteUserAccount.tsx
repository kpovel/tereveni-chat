"use server";

import { env } from "@/env.mjs";
import { getJwtAccessToken } from "../../regenerateAccessToken";

export async function deleteUserAccount() {
  const jwtAccessToken = await getJwtAccessToken();

  const res = await fetch(`${env.SERVER_URL}/api/user/delete`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${jwtAccessToken}`
    }
  });

  if (res.status === 200) {
    return true;
  }

  return false;
}
