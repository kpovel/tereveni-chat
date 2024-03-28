"use server";

import { JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN } from "@/util/cookiesName";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function removeCookies(lang: Lang) {
  cookies().delete(JWT_ACCESS_TOKEN);
  cookies().delete(JWT_REFRESH_TOKEN);

  redirect(`/${lang}`);
}
