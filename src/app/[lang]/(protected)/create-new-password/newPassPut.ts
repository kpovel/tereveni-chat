"use server";

import { redirect } from "next/navigation";
import { env } from "@/env.mjs";
import { getJwtAccessToken } from "../regenerateAccessToken";
import { FormState } from "./createPassForm";
import { langUnwrapOrDefault } from "@/util/lang";
import { cookies } from "next/headers";
import { z } from "zod";
import { DictionaryReturnTypes, getDictionary } from "../../dictionaries";

export async function newPassPut(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const lang = await langUnwrapOrDefault(cookies().get("lang")?.value ?? "en");
  const dict = await getDictionary(`/${lang}/create-new-password`);
  const jwtAccessToken = await getJwtAccessToken();

  const schema = z.object({
    password: z.string().min(1),
    confirmPassword: z.string().min(1),
  });

  const parse = schema.safeParse({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parse.success) {
    const fieldErrors = parse.error.formErrors.fieldErrors;

    return {
      password: fieldErrors.password?.length
        ? dict.errorStatus.passwordConstraint
        : "",
      confirmPassword: fieldErrors.confirmPassword?.length
        ? dict.errorStatus.passwordConstraint
        : "",
      general: "",
    };
  }

  const passMathingError = passwordMatchingError(formData, dict);
  if (passMathingError) {
    return {
      password: "",
      confirmPassword: passMathingError,
      general: "",
    };
  }

  const data = parse.data;
  const response = await fetch(
    `${env.SERVER_URL}/api/user/new-password/save?lang=${lang}`,
    {
      body: JSON.stringify({ userPassword: data.password }),
      method: "PUT",
      headers: {
        Authorization: `Bearer ${jwtAccessToken}`,
        "Content-Type": "application/json",
      },
    },
  );

  if (response.status === 200) {
    redirect(`/${lang}/chat/all`);
  }

  return {
    password: "",
    confirmPassword: "",
    general: await response.text(),
  };
}

function passwordMatchingError(
  formData: FormData,
  dict: Awaited<DictionaryReturnTypes["/en/create-new-password"]>,
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
