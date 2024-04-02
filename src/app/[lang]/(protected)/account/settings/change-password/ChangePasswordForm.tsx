"use client";

import { useFormState } from "react-dom";
import { changePasswordAction } from "./changePasswordAction";
import { PasswordInput } from "@/components/input/PasswordInput";
import { DictionaryReturnTypes } from "@/app/[lang]/dictionaries";
import { SubmitButton } from "@/components/form/SubmitButton";

const initialState: FormState = {
  currentPasswordError: "",
  newPasswordError: "",
  confirmNewPasswordError: "",
};

export function ChangePasswordForm({
  dict,
}: {
  dict: Awaited<DictionaryReturnTypes["/en/account/settings/change-password"]>;
}) {
  const [state, formAction] = useFormState(changePasswordAction, initialState);

  return (
    <form action={formAction} className="flex h-full grow flex-col gap-5">
      <PasswordInput
        placeholder={dict.placeholder.currentPassword}
        errorMessage={[state.currentPasswordError]}
        name="currentPassword"
      />
      <PasswordInput
        placeholder={dict.placeholder.newPassword}
        errorMessage={[state.newPasswordError]}
        name="newPassword"
      />
      <PasswordInput
        placeholder={dict.placeholder.confirmNewPassword}
        errorMessage={[state.confirmNewPasswordError]}
        name="confirmNewPassword"
      />
      <div className="flex grow flex-col justify-end">
        <SubmitButton buttonTitle={dict.saveChanges} />
      </div>
    </form>
  );
}

export type FormState = {
  currentPasswordError: string;
  newPasswordError: string;
  confirmNewPasswordError: string;
};
