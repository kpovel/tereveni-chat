"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { loginPostData } from "./loginPost";
import { DictionaryReturnTypes } from "../dictionaries";

export interface loginDataInterface {
  login: string;
  password: string;
}

export default function LoginForm({
  lang,
  dict,
}: {
  lang: "en" | "uk";
  dict: Awaited<DictionaryReturnTypes["/en/login"]>;
}) {
  const [isHidden, setIsHidden] = useState(true);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const hiddelPassword = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setIsHidden(!isHidden);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const submitError = await loginPostData({ login, password });
    // setError(submitError);
  };

  return (
    <form onSubmit={handleSubmit} className="items-cinter flex flex-col">
      <div className="relative mb-5">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 transform">
          <Image src="/mail.svg" alt="mail" width={20} height={20} />
        </div>
        <input
          className="main__input"
          type="text"
          placeholder={dict.emailPlaceholder}
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
      </div>
      <div className="relative mb-5">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 scale-75 transform">
          <Image src="/lock.svg" alt="lock" width={20} height={20} />
        </div>
        <input
          className="main__input"
          type={`${isHidden ? "password" : "text"}`}
          placeholder={dict.passwordPlaceholder}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="absolute right-5 top-1/2 -translate-y-1/2 transform"
          onClick={hiddelPassword}
        >
          <Image src="/eye-open.svg" alt="lock" width={20} height={20} />
        </button>
      </div>
      <Link
        href={`/${lang}/forgot-password`}
        className="inline-block w-full text-center font-main text-xs font-normal text-violet-400 underline"
      >
        {dict.forgotPassword}
      </Link>

      <button type="submit" className="main__btn mt-32 px-6 py-3">
        {dict.logIn}
      </button>
    </form>
  );
}
