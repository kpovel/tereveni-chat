"use server";

import { z } from "zod";
import { FormState } from "./ChangePasswordForm";
import { env } from "@/env.mjs";

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

  const res = await fetch(`/${env.SERVER_URL}/`);

  return {
    newPasswordError: "adsf",
    currentPasswordError: "",
    confirmNewPasswordError: "",
  };
}
