"use server";

import { redirect } from "next/navigation";
import { env } from "@/env.mjs";
import {
  setJwtAccessToken,
  setJwtRefreshToken,
} from "../(protected)/setTokens";
import { FormState } from "./loginForm";
import { z } from "zod";

type SuccessLoginResponse = {
  type: "Bearer";
  jwtAccessToken: string;
  jwtRefreshToken: string;
};

type UnauthorizedLoginResponse = {
  login: string
  password: string,
  general: string
};

export async function loginPostData(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
    lang: z.enum(["en", "uk"]),
  });

  const parse = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    lang: formData.get("lang"),
  });

  if (!parse.success) {
    const fieldErrors = parse.error.formErrors.fieldErrors;
    return {
      email: fieldErrors.email?.[0] ? "Invalid email" : "",
      password: "",
      general: fieldErrors.lang?.[0] ? "Language isn't supported" : "",
    };
  }

  const { lang, email, password } = parse.data;
  const response = await fetch(`${env.SERVER_URL}/api/login?lang=${lang}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ login: email, password }),
    cache: "no-store",
  });

  if (response.status == 200) {
    const tokens = (await response.json()) as SuccessLoginResponse;

    setJwtAccessToken(tokens.jwtAccessToken);
    setJwtRefreshToken(tokens.jwtRefreshToken);

    redirect(`/${lang}/chat/all`);
  }

  if (response.status === 401 || response.status === 403) {
    const loginError = (await response.json()) as UnauthorizedLoginResponse;
    return {
      email: "",
      password: "",
      general: loginError.general,
    };
  }

  return { email: "", password: "", general: "Server Error" };
}
