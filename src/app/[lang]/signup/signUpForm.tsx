"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import PasswordInput from "./passwordInput";
import { signUpPostData } from "./signUpPost";
import {
  isValidEmail,
  isValidLogin,
  isValidPassword,
} from "@/util/input-validation";
import { DictionaryReturnTypes } from "../dictionaries";
import { LoginInput } from "./loginInput";

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

  function setEmailHandler(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setEmail(e.currentTarget.value);
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
        <div className="relative mt-5">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 transform">
            <Image src="/mail.svg" alt="mail" width={20} height={20} />
          </div>
          <input
            onChange={setEmailHandler}
            value={email}
            className={`main__input ${
              email.trim() && !isValidEmail(email) ? "border-red-500" : ""
            }`}
            type="email"
            placeholder={dict.placeholder.email}
          />
        </div>
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
          passwordConstraint={dict.errorStatus.passwordConstraint}
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
              href={`/${lang}/terms-and-conditions`}
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
