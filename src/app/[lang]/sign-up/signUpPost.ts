"use server";

import { redirect } from "next/navigation";
import { signUpDataInterface } from "./signUpForm";
import { getDictionary } from "../dictionaries";
import { LanguageObject } from "./signUpForm";



export async function signUpPostData(
  data: signUpDataInterface,
  origin: string,
  params: LanguageObject
): Promise<string> {
console.log(params)
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