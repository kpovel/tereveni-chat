"use server";

import { z } from "zod";
import { FormState } from "./ChangePasswordForm";
import { env } from "@/env.mjs";
import { cookies } from "next/headers";
import { langUnwrapOrDefault } from "@/util/lang";
import { getJwtAccessToken } from "../../../regenerateAccessToken";
import { getDictionary } from "@/app/[lang]/dictionaries";

export async function changePasswordAction(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const lang = await langUnwrapOrDefault(cookies().get("lang")?.value ?? "en");
  const jwtAccessToken = await getJwtAccessToken();
  const dict = await getDictionary(`/${lang}/account/settings/change-password`);

  const schema = z.object({
    currentPassword: z.string().min(1),
    newPassword: z.string().min(1),
    confirmNewPassword: z.string().min(1),
  });

  const parse = schema.safeParse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    confirmNewPassword: formData.get("confirmNewPassword"),
  });

  if (!parse.success) {
    const fieldErrors = parse.error.formErrors.fieldErrors;

    return {
      currentPasswordError: fieldErrors.currentPassword?.[0]
        ? dict.error.incorectPassword
        : "",
      newPasswordError: fieldErrors.newPassword?.[0]
        ? dict.error.passwordConstraint
        : "",
      confirmNewPasswordError: "",
      changedPassword: false,
    };
  }

  const data = parse.data;
  if (data.newPassword !== data.confirmNewPassword) {
    return {
      currentPasswordError: "",
      newPasswordError: "",
      confirmNewPasswordError: dict.error.passwordsDoNotMatch,
      changedPassword: false,
    };
  }

  const res = await fetch(
    `${env.SERVER_URL}/api/user/edit-password?lang=${lang}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${jwtAccessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
      }),
    },
  );

  if (res.status === 200) {
    return {
      currentPasswordError: "",
      newPasswordError: "",
      confirmNewPasswordError: "",
      changedPassword: true,
    };
  }

  if (res.status === 400) {
    const json = (await res.json()) as {
      oldPassword?: string;
      newPassword?: string;
    };

    return {
      currentPasswordError: json.oldPassword ?? "",
      newPasswordError: json.newPassword ?? "",
      confirmNewPasswordError: "",
      changedPassword: false,
    };
  }

  return {
    currentPasswordError: "internal server error",
    newPasswordError: "",
    confirmNewPasswordError: "",
    changedPassword: false,
  };
}
