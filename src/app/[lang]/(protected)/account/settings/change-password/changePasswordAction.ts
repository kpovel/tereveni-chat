"use server";

import { FormState } from "./ChangePasswordForm";

export async function changePasswordAction(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  return {
    newPasswordError: "",
    currentPasswordError: "",
    confirmNewPasswordError: "",
  };
}
