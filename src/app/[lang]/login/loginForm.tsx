"use client";

import Link from "next/link";
import { loginPostData } from "./loginPost";
import { DictionaryReturnTypes } from "../dictionaries";
import { EmailInput } from "@/components/input/EmailInput";
import { PasswordInput } from "@/components/input/PasswordInput";
import { useFormState } from "react-dom";
import { SubmitButton } from "@/components/form/SubmitButton";

export type FormState = {
  email: string;
  password: string;
  general: string;
};

const initialState = {
  email: "",
  password: "",
  general: "",
} satisfies FormState;

export default function LoginForm({
  lang,
  dict,
}: {
  lang: Lang;
  dict: Awaited<DictionaryReturnTypes["/en/login"]>;
}) {
  const [state, formAction] = useFormState(loginPostData, initialState);

  return (
    <form action={formAction} className="flex w-full flex-col gap-10 h-full">
      <div className="grid gap-5">
        <EmailInput
          placeholder={dict.emailPlaceholder}
          errorMessage={[state.email]}
        />
        <PasswordInput
          placeholder={dict.passwordPlaceholder}
          errorMessage={[state.password || state.general]}
        />
        <input name="lang" value={lang} className="hidden" readOnly />
        <Link
          href={`/${lang}/forgot-password`}
          className="inline-block w-full text-center text-xs font-normal text-[#9D83F9] underline"
        >
          {dict.forgotPassword}
        </Link>
      </div>
      <SubmitButton buttonTitle={dict.logIn} />
    </form>
  );
}
