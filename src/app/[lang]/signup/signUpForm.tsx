"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { signUpPostData } from "./signUpPost";
import {
  isValidEmail,
  isValidLogin,
  isValidPassword,
} from "@/util/input-validation";
import { DictionaryReturnTypes } from "../dictionaries";
import { EmailInput } from "@/components/input/EmailInput";
import { LoginInput } from "@/components/input/LoginInput";
import { PasswordInput } from "@/components/input/PasswordInput";

export default function SignUpForm({
  lang,
  dict,
}: {
  lang: "en" | "uk";
  dict: Awaited<DictionaryReturnTypes["/en/signup"]>;
}) {
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [singupError, setSignupError] = useState("");
  const isEnabledSubmit =
    isValidLogin(login) &&
    isValidEmail(email) &&
    isValidPassword(password) &&
    password === confirmPassword &&
    isTermsChecked;

  function toggleTerms() {
    setIsTermsChecked(!isTermsChecked);
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataSubmit = {
      login,
      email,
      password,
    };

    const error = await signUpPostData(formDataSubmit, window.origin, lang);
    setSignupError(error);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full grow flex-col justify-between"
    >
      <div>
        <LoginInput
          login={login}
          setLogin={setLogin}
          placeholder={dict.placeholder.login}
        />
        {login.trim() && !isValidLogin(login) && (
          <div className="px-2 pt-1">
            <p className="text-xs font-normal leading-none text-red-500">
              {dict.errorStatus.loginCharacters}
            </p>
          </div>
        )}
        <EmailInput
          email={email}
          setEmail={setEmail}
          placeholder={dict.placeholder.email}
        />
        {!isValidEmail && (
          <div className="px-2 pt-1">
            <p className="text-xs font-normal leading-none text-red-500">
              {dict.errorStatus.invalidEmail}
            </p>
          </div>
        )}
        <PasswordInput
          pass={password}
          setPass={setPassword}
          placeholder={dict.placeholder.password}
          hint={true}
          errorMessage={dict.errorStatus.passwordConstraint}
        />
        <PasswordInput
          setPass={setConfirmPassword}
          hint={false}
          placeholder={dict.placeholder.confirmPassword}
          pass={confirmPassword}
        />
        {password !== confirmPassword && (
          <div className="px-2 pt-1">
            <p className="text-xs font-normal leading-none text-red-500">
              {dict.errorStatus.passwordNotMatch}
            </p>
          </div>
        )}
      </div>

      <div>
        <div className="mt-10 flex items-center text-center">
          <div
            className="flex h-[19px] w-[19px] items-center justify-center rounded border-2 border-solid border-white"
            onClick={toggleTerms}
          >
            {isTermsChecked && (
              <Image src="/checked.svg" alt="mail" width={12} height={12} />
            )}
          </div>
          <span className="ml-2 text-left text-xs font-normal leading-none text-neutral-50">
            {dict.terms.read}{" "}
            <Link
              href={`/${lang}/terms-conditions`}
              className="text-center text-xs font-normal text-[#9D83F9] underline"
            >
              {dict.terms.termsConditions}
            </Link>
          </span>
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
            {dict.nextStep}
          </button>
        </div>
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
      <label
        className="relative flex cursor-pointer items-center rounded-full"
        htmlFor="link"
      >
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
