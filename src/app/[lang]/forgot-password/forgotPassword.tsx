"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import { isValidEmail } from "@/util/input-validation";
import { DictionaryReturnTypes } from "../dictionaries";
import { sendMailPutData } from "./sendMailPutData";

export default function ForgotPassword({
  lang,
  dict,
}: {
  lang: "en" | "uk";
  dict: Awaited<DictionaryReturnTypes["/en/login"]>;
}) {
  const [email, setEmail] = useState("");
  const [sendEmailError, setSendEmailError] = useState("");
  const isDisabledSubmit = !isValidEmail(email);

  const setEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.currentTarget.value);
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const error = await sendMailPutData(email, window.origin, lang);

    setSendEmailError(error);
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
      <button
        type="submit"
        disabled={isDisabledSubmit}
        className={`main__btn ${
          isDisabledSubmit ? "bg-opacity-10 text-zinc-500" : ""
        } mt-32 px-6 py-3`}
      >
        {dict.sendToMail}
      </button>
    </form>
  );
}
