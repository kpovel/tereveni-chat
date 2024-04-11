"use client";

import { DictionaryReturnTypes } from "../../dictionaries";
import { newPassPut } from "./newPassPut";
import { PasswordInput } from "@/components/input/PasswordInput";
import { useFormState } from "react-dom";
import { SubmitButton } from "@/components/form/SubmitButton";

export type FormState = {
  password: string;
  confirmPassword: string;
  general: string;
};

const initialData = {
  password: "",
  confirmPassword: "",
  general: "",
} satisfies FormState;

export default function CreatePassForm({
  dict,
}: {
  lang: "en" | "uk";
  dict: Awaited<DictionaryReturnTypes["/en/create-new-password"]>;
}) {
  const [state, formAction] = useFormState(newPassPut, initialData);

  return (
    <form
      action={formAction}
      className="flex w-full grow flex-col justify-between"
    >
      <div className="grid gap-5">
        <PasswordInput
          placeholder={dict.placeholder.password}
          errorMessage={[state.password]}
          hint={dict.hint.password}
          name="password"
        />
        <PasswordInput
          placeholder={dict.placeholder.confirmPassword}
          errorMessage={[state.confirmPassword || state.general]}
          name="confirmPassword"
        />
      </div>

      <div>
        <SubmitButton buttonTitle={dict.title} />
      </div>
    </form>
  );
}
