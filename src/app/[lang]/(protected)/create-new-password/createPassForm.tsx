"use client";

import { useState, FormEvent } from "react";
import { isValidPassword } from "@/util/input-validation";
import { DictionaryReturnTypes } from "../../dictionaries";
import { newPassPut } from "./newPassPut";
import { PasswordInput } from "@/components/input/PasswordInput";

export default function CreatePassForm({
  lang,
  dict,
}: {
  lang: "en" | "uk";
  dict: Awaited<DictionaryReturnTypes["/en/create-new-password"]>;
}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [singupError, setSignupError] = useState("");
  const isEnabledSubmit =
    isValidPassword(password) && password === confirmPassword;

  function setPassHandler(pass: string) {
    setPassword(pass);
  }

  function setConfirmPassHandler(pass: string) {
    setConfirmPassword(pass);
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const error = await newPassPut(password, lang);
    setSignupError(error);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full grow flex-col"
    >
      <div>
        <PasswordInput
          setPass={setPassHandler}
          hint={true}
          placeholder={dict.placeholder.password}
          pass={password}
          passwordConstraint={dict.errorStatus.passwordConstraint}
        />
        <PasswordInput
          setPass={setConfirmPassHandler}
          hint={false}
          placeholder={dict.placeholder.confirmPassword}
          pass={confirmPassword}
        />
        {password !== confirmPassword && (
          <div className="px-2 pt-1">
            <p className="font-main text-xs font-normal leading-none text-red-500">
              {dict.errorStatus.passwordNotMatch}
            </p>
          </div>
        )}
      </div>

      <div>
        <div className="my-5 text-xs text-red-500">{singupError}</div>
        <button
          type="submit"
          disabled={!isEnabledSubmit}
          className={`main__btn ${
            !isEnabledSubmit && "bg-opacity-10 text-zinc-500"
          } px-6 py-3`}
        >
          {dict.continue}
        </button>
      </div>
    </form>
  );
}
