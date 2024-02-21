"use client";

import Link from "next/link";
import { signUpPostData } from "./signUpPost";
import { DictionaryReturnTypes } from "../dictionaries";
import { EmailInput } from "@/components/input/EmailInput";
import { LoginInput } from "@/components/input/LoginInput";
import { PasswordInput } from "@/components/input/PasswordInput";
import { SubmitButton } from "@/components/form/SubmitButton";
import { ConfigmPasswordInput } from "@/components/input/ConfirmPasswordInput";
import { useFormState } from "react-dom";

export type FormState = {
  login: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsConditions: string;
  general: string;
};

const initialData = {
  login: "",
  email: "",
  password: "",
  confirmPassword: "",
  termsConditions: "",
  general: "",
} satisfies FormState;

export default function SignUpForm({
  lang,
  dict,
}: {
  lang: Lang;
  dict: Awaited<DictionaryReturnTypes["/en/signup"]>;
}) {
  const [state, formAction] = useFormState(signUpPostData, initialData);

  return (
    <form
      action={formAction}
      className="flex w-full grow flex-col justify-between gap-10"
    >
      <div className="grid gap-5">
        <LoginInput
          placeholder={dict.placeholder.login}
          errorMessage={state.login}
        />
        <EmailInput
          placeholder={dict.placeholder.email}
          errorMessage={state.email}
        />
        <PasswordInput
          placeholder={dict.placeholder.password}
          errorMessage={state.password}
        />
        <ConfigmPasswordInput
          placeholder={dict.placeholder.confirmPassword}
          errorMessage={state.confirmPassword || state.general}
        />
      </div>

      <div className="grid gap-5">
        <div>
          <AcceptTermsConditions dict={dict} lang={lang} />
          {state.termsConditions && (
            <div className="text-xs text-[#FF453A]">
              {state.termsConditions}
            </div>
          )}
        </div>
        <SubmitButton buttonTitle={dict.nextStep} />
      </div>
    </form>
  );
}

function AcceptTermsConditions({
  dict,
  lang,
}: {
  dict: Awaited<DictionaryReturnTypes["/en/signup"]>;
  lang: Lang;
}) {
  return (
    <div className="inline-flex items-center">
      <label className="relative flex cursor-pointer items-center rounded-full">
        <input
          type="checkbox"
          className="before:content[''] peer relative h-5 w-5 cursor-pointer
          appearance-none rounded-md border-2"
          name="AcceptTermsConditions"
        />
        <span
          className="pointer-events-none absolute left-2/4 top-2/4
          -translate-x-2/4 -translate-y-2/4 text-white opacity-0
          peer-checked:opacity-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="4"
            stroke="white"
            className="h-3 w-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </span>
      </label>
      <span className="ml-2 text-xs text-neutral-50">
        {dict.terms.read}{" "}
        <Link
          href={`/${lang}/terms-conditions`}
          className="text-[#9D83F9] underline"
        >
          {dict.terms.termsConditions}
        </Link>
      </span>
    </div>
  );
}
