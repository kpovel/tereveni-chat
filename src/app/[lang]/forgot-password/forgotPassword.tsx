"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import { isValidEmail } from "@/util/input-validation";
import { DictionaryReturnTypes } from "../dictionaries";
import { sendMailPutData } from "./sendMailPutData";
import { EmailInput } from "../login/emailInput";

export default function ForgotPassword({
  lang,
  dict,
}: {
  lang: "en" | "uk";
  dict: Awaited<DictionaryReturnTypes["/en/forgot-password"]>;
}) {
  const [email, setEmail] = useState("");
  const [sendEmailError, setSendEmailError] = useState("");
  const isDisabledSubmit = !isValidEmail(email);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSendEmailError('');

    const error = await sendMailPutData(email, window.origin, lang);

    setSendEmailError(error);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="relative">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 transform">
          <Image src="/mail.svg" alt="mail" width={20} height={20} />
        </div>
        <EmailInput
          email={email}
          setEmail={setEmail}
          placeholder={dict.emailPlaceholder}
        />
      </div>
      <div className="px-2 py-1 text-xs text-red-500">{sendEmailError}</div>
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