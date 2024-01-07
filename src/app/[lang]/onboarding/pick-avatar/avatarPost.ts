"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "@/env.mjs";

type SignUpResponseError = {
  fieldName: string;
  fieldMessage: string;
};

export async function avatarPost(
  url: string,
  formData: FormData | Record<string, unknown>,
  lang: "en" | "uk",
  method: string,
) {
  const accessToken = cookies().get("jwtAccessToken");

  if (!accessToken) {
    redirect(`/en`);
  }

  const requestOptions: RequestInit = {
    method,
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
    },
    cache: "no-store",
  };

  if (method === "POST" || method === "PUT") {
    if (formData instanceof FormData) {
      requestOptions.body = formData;
    } else {
      requestOptions.body = JSON.stringify(formData);
      (requestOptions.headers as Record<string, string>)["Content-Type"] =
        "application/json";
    }
  }

  const res = await fetch(`${env.SERVER_URL}${url}`, requestOptions);

  if (res.ok) {
    console.log(res);
    redirect(`/${lang}/onboarding/introduce-yourself`);
  }

  const body = (await res.json()) as SignUpResponseError;

  return body.fieldMessage;
}
