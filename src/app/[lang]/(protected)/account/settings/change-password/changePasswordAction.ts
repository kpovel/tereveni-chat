"use server";

import { z } from "zod";
import { FormState } from "./ChangePasswordForm";
import { env } from "@/env.mjs";
import { cookies } from "next/headers";
import { langUnwrapOrDefault } from "@/util/lang";
import { getJwtAccessToken } from "../../../regenerateAccessToken";

export async function changePasswordAction(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
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

    // todo: update error messages
    return {
      currentPasswordError: fieldErrors.currentPassword?.[0] ?? "",
      newPasswordError: fieldErrors.newPassword?.[0] ?? "",
      confirmNewPasswordError: fieldErrors.confirmNewPassword?.[0] ?? "",
    };
  }

  const data = parse.data;

  if (data.newPassword !== data.confirmNewPassword) {
    // todo: update error messages
    return {
      currentPasswordError: "",
      newPasswordError: "",
      confirmNewPasswordError: "passwords doesn't match",
    };
  }

  const lang = await langUnwrapOrDefault(cookies().get("lang")?.value ?? "en");
  const jwtAccessToken = await getJwtAccessToken();
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
    // todo: update success state
    return {
      currentPasswordError: "",
      newPasswordError: "",
      confirmNewPasswordError: "",
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
    };
  }

  return {
    currentPasswordError: "internal server error",
    newPasswordError: "",
    confirmNewPasswordError: "",
  };
}
