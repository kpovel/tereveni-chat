"use client";

import { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import PasswordInput from "./passwordInput";
import { signUpPostData } from "./signUpPost";
import { validateInput } from "@/util/input-validation";
import { DictionaryReturnTypes } from "../dictionaries";

export default function SignUpForm({
  lang,
  dict,
}: {
  lang: "en" | "uk";
  dict: Awaited<DictionaryReturnTypes["/en/signup"]>;
}) {
  const isFirstRender = useRef(true);

  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidLogin, setIsValidLogin] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [singupError, setSignupError] = useState("");
  const [isDisabledSubmit, setIsDisabledSubmit] = useState(true);

  const termsCheckedHandler = () => {
    setIsTermsChecked(!isTermsChecked);
  };

  const setLoginHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const isValidLogin = validateInput(e.currentTarget.value, "login");
    setIsValidLogin(isValidLogin);
    setLogin(e.currentTarget.value);
  };

  const setEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const isValidEmail = validateInput(e.currentTarget.value, "email");
    setIsValidEmail(isValidEmail);
    setEmail(e.currentTarget.value);
  };

  const setPassHandler = (pass: string) => {
    const isValidPass = validateInput(pass, "password");
    setIsValidPassword(isValidPass);
    setPassword(pass);
  };

  const setConfirmPassHandler = (pass: string) => {
    setConfirmPassword(pass);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setIsDisabledSubmit(true);
    if (
      login.trim() !== "" &&
      email.trim() !== "" &&
      password.trim() !== "" &&
      confirmPassword.trim() !== "" &&
      isValidLogin &&
      isValidEmail &&
      isValidPassword &&
      isTermsChecked &&
      password === confirmPassword
    ) {
      setIsDisabledSubmit(false);
    }
  }, [
    password,
    confirmPassword,
    email,
    login,
    isTermsChecked,
    isValidLogin,
    isValidEmail,
    isValidPassword,
  ]);

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
      className="flex grow flex-col items-center justify-between"
    >
      <div>
        <div className="relative">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 transform">
            <Image src="/user.svg" alt="mail" width={20} height={20} />
          </div>
          <input
            value={login}
            onChange={setLoginHandler}
            className={`main__input ${!isValidLogin ? "border-red-500" : null}`}
            type="text"
            placeholder={dict.placeholder.login}
          />
        </div>
        {!isValidLogin ? (
          <div className="px-2 pt-1">
            <p className="font-main text-xs font-normal leading-none text-red-500">
              {dict.errorStatus.loginCharacters}
            </p>
          </div>
        ) : null}
        <div className="relative mt-5">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 transform">
            <Image src="/mail.svg" alt="mail" width={20} height={20} />
          </div>
          <input
            onChange={setEmailHandler}
            value={email}
            className={`main__input ${!isValidEmail ? "border-red-500" : null}`}
            type="text"
            placeholder={dict.placeholder.email}
          />
        </div>
        {!isValidEmail && (
          <div className="px-2 pt-1">
            <p className="font-main text-xs font-normal leading-none text-red-500">
              {dict.errorStatus.invalidEmail}
            </p>
          </div>
        )}
        <PasswordInput
          setPassHandler={setPassHandler}
          hint={true}
          placeholder={dict.placeholder.password}
          pass={password}
          isValid={isValidPassword}
          dict={dict}
        />
        <PasswordInput
          setPassHandler={setConfirmPassHandler}
          hint={false}
          placeholder={dict.placeholder.confirmPassword}
          pass={confirmPassword}
          isValid={isValidPassword}
          dict={dict}
        />
        {password !== confirmPassword && (
          <div className="px-2 pt-1">
            <p className="font-main text-xs font-normal leading-none text-red-500">
              {dict.errorStatus.passwordNotMatch}
            </p>
          </div>
        )}
        <div className="mt-10 flex items-center text-center">
          <div
            className="flex h-[19px] w-[19px] items-center justify-center rounded border-2 border-solid border-white"
            onClick={termsCheckedHandler}
          >
            {isTermsChecked && (
              <Image src="/checked.svg" alt="mail" width={12} height={12} />
            )}
          </div>
          <span className="ml-2 text-left font-main text-xs font-normal leading-none text-neutral-50">
            {dict.terms.read}
            <Link
              href={`/${lang}/terms-and-conditions`}
              className="ml-1 inline break-words text-center font-main text-xs font-normal text-violet-400 underline"
            >
              {dict.terms.termsConditions}
            </Link>
          </span>
        </div>
      </div>

      <div className="w-full">
        <div className="my-5 text-xs text-red-500">{singupError}</div>
        <button
          type="submit"
          disabled={isDisabledSubmit}
          className={`main__btn ${
            isDisabledSubmit && "here bg-opacity-10 text-zinc-500"
          } px-6 py-3`}
        >
          {dict.nextStep}
        </button>
      </div>
    </form>
  );
}
