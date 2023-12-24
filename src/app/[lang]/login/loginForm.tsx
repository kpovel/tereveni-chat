"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { loginPostData } from "./loginPost";
import { isValidEmail, isValidPassword } from "@/util/input-validation";
import { DictionaryReturnTypes } from "../dictionaries";

export default function LoginForm({
  lang,
  dict,
}: {
  lang: "en" | "uk";
  dict: Awaited<DictionaryReturnTypes["/en/login"]>;
}) {
  const [isHiddenPassword, setIsHiddenPassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const isDisabledSubmit = !isValidEmail(email) || !isValidPassword(password);

  function setEmailHandler(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setEmail(e.currentTarget.value);
  }

  function setPassHandler(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setPassword(e.currentTarget.value);
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const submitError = (await loginPostData(
      // our backend teammate's bad decision
      { login: email, password },
      lang,
    )) as string;

    setLoginError(submitError);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="relative mb-5">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 transform">
          <Image src="/mail.svg" alt="mail" width={20} height={20} />
        </div>
        <input
          className={`main__input ${
            email.trim() && !isValidEmail(email) ? "border-red-500" : ""
          }`}
          type="email"
          placeholder={dict.emailPlaceholder}
          value={email}
          onChange={setEmailHandler}
        />
      </div>
      <div className="relative mb-1">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 scale-75 transform">
          <Image src="/lock.svg" alt="lock" width={20} height={20} />
        </div>
        <input
          className={`main__input ${
            password.trim() && !isValidPassword(password)
              ? "border-red-500"
              : ""
          }`}
          type={`${isHiddenPassword ? "password" : "text"}`}
          placeholder={dict.passwordPlaceholder}
          value={password}
          onChange={setPassHandler}
        />
        <button
          className="absolute right-5 top-1/2 -translate-y-1/2 transform"
          onClick={(e) => {
            e.preventDefault();
            setIsHiddenPassword(!isHiddenPassword);
          }}
        >
          <Image src="/eye-open.svg" alt="lock" width={20} height={20} />
        </button>
      </div>
      <div className="mb-5 ml-1 text-xs text-red-500">{loginError}</div>
      <Link
        href={`/${lang}/forgot-password`}
        className="inline-block w-full text-center font-main text-xs font-normal text-violet-400 underline"
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
