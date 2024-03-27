"use server";

import { env } from "@/env.mjs";
import { JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN } from "@/util/cookiesName";
import { cookies } from "next/headers";

export async function deleteUserAccount() {
  // todo: fix me
  const res = await fetch(`${env.SERVER_URL}/api/user/delete`, {
    method: "DELETE",
  });

  if (res.status === 200) {
    cookies().delete(JWT_ACCESS_TOKEN);
    cookies().delete(JWT_REFRESH_TOKEN);
    return true;
  }

  return false;
}
