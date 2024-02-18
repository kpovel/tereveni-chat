"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { loginPostData } from "./loginPost";
import { isValidEmail, isValidPassword } from "@/util/input-validation";
import { DictionaryReturnTypes } from "../dictionaries";
import PasswordInput from "../signup/passwordInput";
import { EmailInput } from "@/components/input/EmailInput";

export default function LoginForm({
  lang,
  dict,
}: {
  lang: Lang;
  dict: Awaited<DictionaryReturnTypes["/en/login"]>;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const isDisabledSubmit = !isValidEmail(email) || !isValidPassword(password);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const submitError = await loginPostData({ login: email, password }, lang);
    setLoginError(submitError);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full">
      <EmailInput
        email={email}
        setEmail={setEmail}
        placeholder={dict.emailPlaceholder}
      />
      <PasswordInput
        pass={password}
        setPass={setPassword}
        placeholder={dict.passwordPlaceholder}
        hint={false}
      />
      <div className="mb-5 ml-1 text-xs text-red-500">{loginError}</div>
      <Link
        href={`/${lang}/forgot-password`}
        className="inline-block w-full text-center text-xs font-normal text-[#9D83F9] underline"
      >
        {dict.forgotPassword}
      </Link>

      <button
        type="submit"
        disabled={isDisabledSubmit}
        className={`main__btn ${
          isDisabledSubmit ? "bg-opacity-10 text-zinc-500" : ""
        } mt-32 px-6 py-3`}
      >
        {dict.logIn}
      </button>
    </form>
  );
}
