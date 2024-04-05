"use client";

import { useFormState } from "react-dom";
import { changePasswordAction } from "./changePasswordAction";
import { PasswordInput } from "@/components/input/PasswordInput";
import { DictionaryReturnTypes } from "@/app/[lang]/dictionaries";
import { SubmitButton } from "@/components/form/SubmitButton";
import { DeletedChatPopup } from "./DeletedChatePopup";

const initialState: FormState = {
  currentPasswordError: "",
  newPasswordError: "",
  confirmNewPasswordError: "",
  changedPassword: false,
};

export function ChangePasswordForm({
  dict,
  lang,
}: {
  dict: Awaited<DictionaryReturnTypes["/en/account/settings/change-password"]>;
  lang: Lang;
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
        hint={dict.hint.password}
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
      {state.changedPassword && <DeletedChatPopup dict={dict} lang={lang} />}
    </form>
  );
}

export type FormState = {
  currentPasswordError: string;
  newPasswordError: string;
  confirmNewPasswordError: string;
  changedPassword: boolean;
};
