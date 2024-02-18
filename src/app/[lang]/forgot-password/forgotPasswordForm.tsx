"use client";

import { DictionaryReturnTypes } from "../dictionaries";
import { sendMailPutData } from "./sendMailPutData";
import { EmailInput } from "@/components/input/EmailInput";
import { useFormState } from "react-dom";
import { SubmitButton } from "@/components/form/SubmitButton";

const initialState = {
  email: "",
};

export function ForgotPasswordForm({
  dict,
}: {
  dict: Awaited<DictionaryReturnTypes["/en/forgot-password"]>;
}) {
  const [state, formAction] = useFormState(sendMailPutData, initialState);

  return (
    <form
      action={formAction}
      className="flex w-full max-w-md grow flex-col justify-between"
    >
      <EmailInput
        errorMessage={state.email}
        placeholder={dict.emailPlaceholder}
      />
      <SubmitButton buttonTitle={dict.sendToMail} />
    </form>
  );
}
