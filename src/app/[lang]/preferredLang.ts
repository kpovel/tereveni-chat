"use server";
import { cookies } from "next/headers";

export async function setPreferredLang(lang: string) {
  cookies().set("lang", lang);
}
