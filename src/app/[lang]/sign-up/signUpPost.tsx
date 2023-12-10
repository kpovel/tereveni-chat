"use server";

import { redirect } from "next/navigation";
import { signUpDataInterface } from "./signUpForm";
import { getDictionary } from "../dictionaries";

export async function signUpPostData(
  data: signUpDataInterface,
  {
    params,
  }: {
    params: { lang: "uk" | "en" };
  },
  origin: string,
): Promise<string> {
  const dict = await getDictionary(`/${params.lang}`);
  const response = await fetch(`${process.env.SERVER_URL}/api/signup`, {
    body: JSON.stringify(data),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Originating-Host": origin,
    },
  });

  if (response.ok) {
    redirect(`/${params.lang}/validate-email`);
  }

  return await response.text();
}
