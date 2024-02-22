"use client";

import { useState, FormEvent } from "react";
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
    setSendEmailError("");

    const error = await sendMailPutData(email, window.origin, lang);

    setSendEmailError(error);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <EmailInput
        email={email}
        setEmail={setEmail}
        placeholder={dict.emailPlaceholder}
      />
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
