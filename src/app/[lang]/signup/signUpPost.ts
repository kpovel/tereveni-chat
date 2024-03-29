"use server";

import { redirect } from "next/navigation";
import { env } from "@/env.mjs";
import { cookies, headers } from "next/headers";
import { FormState } from "./signUpForm";
import { z } from "zod";
import { DictionaryReturnTypes, getDictionary } from "../dictionaries";
import { langUnwrapOrDefault } from "@/util/lang";
import { ErrorAuthResponse } from "../login/loginPost";

export async function signUpPostData(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const lang = await langUnwrapOrDefault(cookies().get("lang")?.value ?? "");
  const dict = await getDictionary(`/${lang}/signup`);

  const schema = z.object({
    login: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(1),
    confirmPassword: z.string().min(1),
    acceptTermsConditions: z.enum(["on"]),
  });

  const parse = schema.safeParse({
    login: formData.get("login"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    acceptTermsConditions: formData.get("AcceptTermsConditions"),
  });

  if (!parse.success) {
    const fieldErrors = parse.error.formErrors.fieldErrors;

    return {
      email: fieldErrors.email?.length ? dict.errorStatus.invalidEmail : "",
      login: fieldErrors.login?.length ? dict.errorStatus.loginCharacters : "",
      password: fieldErrors.password?.length
        ? dict.errorStatus.passwordConstraint
        : "",
      confirmPassword: passwordMatchingError(formData, dict),
      termsConditions: fieldErrors.acceptTermsConditions?.length
        ? dict.errorStatus.acceptTermsConditions
        : "",
      general: "",
    };
  }

  const passMatchingError = passwordMatchingError(formData, dict);
  if (passMatchingError) {
    return {
      email: "",
      login: "",
      password: "",
      confirmPassword: passMatchingError,
      termsConditions: "",
      general: "",
    };
  }

  const data = parse.data;
  const response = await fetch(`${env.SERVER_URL}/api/signup?lang=${lang}`, {
    body: JSON.stringify({
      login: data.login,
      email: data.email,
      password: data.password,
    }),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Originating-Host": headers().get("Origin") ?? "",
    },
    cache: "no-store",
  });

  if (response.ok) {
    redirect(`/${lang}/send-mail`);
  }

  const body = (await response.json()) as ErrorAuthResponse & {
    email?: string;
  };

  return {
    email: body.email ?? "",
    login: body.login ?? "",
    password: body.password ?? "",
    confirmPassword: "",
    termsConditions: "",
    general: body.general ?? "",
  };
}

function passwordMatchingError(
  formData: FormData,
  dict: Awaited<DictionaryReturnTypes["/en/signup"]>,
): string {
  const password = formData.get("password")?.toString();
  const confirmPassword = formData.get("confirmPassword")?.toString();

  if (password === undefined || confirmPassword === undefined) {
    return "";
  }

  if (password === confirmPassword) {
    return "";
  }

  return dict.errorStatus.passwordNotMatch;
}
