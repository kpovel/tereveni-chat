"use client";

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  ChangeEvent,
  FormEvent,
} from "react";
import Link from "next/link";
import Image from "next/image";
import PasswordInput from "./passwordInput";
import { signUpPostData } from "./signUpPost";
import { validateInput } from "../../../util/input-validation";
import { DictionaryReturnTypes } from "../dictionaries";

export interface signUpDataInterface {
  login: string;
  email: string;
  password: string;
}

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
  const [isValidateEmail, setIsValidateEmail] = useState(true);
  const [isValidateLogin, setIsValidateLogin] = useState(true);
  const [isValidatePassword, setIsValidatePassword] = useState(true);
  const [isPassMatching, setIsPassMatching] = useState(true);
  const [singupError, setSignupError] = useState("");

  const termsChekedHandler = () => {
    setIsTermsChecked(!isTermsChecked);
  };

  const setLoginHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const isValidLogin = validateInput(e.currentTarget.value, "login");
    setIsValidateLogin(isValidLogin);
    setLogin(e.currentTarget.value);
  };

  const setEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const isValidEmail = validateInput(e.currentTarget.value, "email");
    setIsValidateEmail(isValidEmail);
    setEmail(e.currentTarget.value);
  };

  const setPassHandler = (pass: string) => {
    const isValidPass = validateInput(pass, "password");
    setIsValidatePassword(isValidPass);
    setPassword(pass);
  };

  const setConfirmPassHandler = (pass: string) => {
    setConfirmPassword(pass);
  };

  const checkPassMatching = useCallback(() => {
    if (password !== "" && password) {
      setIsPassMatching(password === confirmPassword);
    }
  }, [password, confirmPassword]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    checkPassMatching();
  }, [password, confirmPassword, checkPassMatching]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataSubmit = {
      login,
      email,
      password,
    };

    const error = await signUpPostData(formDataSubmit, window.origin, lang);
    setSignupError(error);

    console.log(error);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 transform">
          <Image src="/user.svg" alt="mail" width={20} height={20} />
        </div>
        <input
          value={login}
          onChange={setLoginHandler}
          className={`main__input ${
            !isValidateLogin ? "border-red-500" : null
          }`}
          type="text"
          placeholder={dict.placeholder.login}
        />
      </div>
      {!isValidateLogin ? (
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
          className={`main__input ${
            !isValidateEmail ? "border-red-500" : null
          }`}
          type="text"
          placeholder={dict.placeholder.email}
        />
      </div>
      {!isValidateEmail ? (
        <div className="px-2 pt-1">
          <p className="font-main text-xs font-normal leading-none text-red-500">
            {dict.errorStatus.invalidEmail}
          </p>
        </div>
      ) : null}
      <PasswordInput
        setPassHandler={setPassHandler}
        hint={true}
        placeholder={dict.placeholder.password}
        pass={password}
        isValid={isValidatePassword}
        dict={dict}
      />
      <PasswordInput
        setPassHandler={setConfirmPassHandler}
        hint={false}
        placeholder={dict.placeholder.confirmPassword}
        pass={confirmPassword}
        isValid={isValidatePassword}
        dict={dict}
      />
      {!isPassMatching ? (
        <div className="px-2 pt-1">
          <p className="font-main text-xs font-normal leading-none text-red-500">
            {dict.errorStatus.passwordNotMatch}
          </p>
        </div>
      ) : null}
      <div className="mt-10 flex items-center text-center">
        <div
          className="flex h-[19px] w-[19px] items-center justify-center rounded border-2 border-solid border-white"
          onClick={termsChekedHandler}
        >
          {isTermsChecked ? (
            <Image src="/checked.svg" alt="mail" width={12} height={12} />
          ) : null}
        </div>
        <span className="ml-2 text-left font-main text-xs font-normal leading-none text-neutral-50">
          {dict.terms.read}
          <Link
            href=""
            className="ml-1 inline-block break-words text-center font-main text-xs font-normal text-violet-400 underline"
          >
            {dict.terms.termsConditions}
          </Link>
        </span>
      </div>

      <button type="submit" className="main__btn mt-32 px-6 py-3">
        {dict.nextStep}
      </button>
    </form>
  );
}
