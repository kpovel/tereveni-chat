"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import PasswordInput from "./passwordInput";
import { signUpPostData } from "./signUpPOST";
import { validateInput } from "../../../util/input-validation";

export interface signUpDataInterface {
  login: string;
  email: string;
  password: string;
}

export default function SignUpForm() {
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

  const setLoginHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const isValidLogin = validateInput(e.currentTarget.value, "login");
    setIsValidateLogin(isValidLogin);
    setLogin(e.currentTarget.value);
  };

  const setEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const checkPassMatching = () => {
    if (password !== "" && password) {
      setIsPassMatching(password === confirmPassword);
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    checkPassMatching();
  }, [password, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataSubmit = {
      login,
      email,
      password,
    };

    const error = await signUpPostData(formDataSubmit, window.origin);
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
          placeholder="Login"
        />
      </div>
      {!isValidateLogin ? (
        <div className="px-2 pt-1">
          <p className="font-main text-xs font-normal leading-none text-red-500">
            Login must be 3 to 50 characters and contain only ABC and numbers
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
          placeholder="Email address"
        />
      </div>
      {!isValidateEmail ? (
        <div className="px-2 pt-1">
          <p className="font-main text-xs font-normal leading-none text-red-500">
            Please enter a valid email address
          </p>
        </div>
      ) : null}
      <PasswordInput
        setPassHandler={setPassHandler}
        hint={true}
        placeholder={"Password"}
        pass={password}
        isValid={isValidatePassword}
      />
      <PasswordInput
        setPassHandler={setConfirmPassHandler}
        hint={false}
        placeholder={"Confirm Password"}
        pass={confirmPassword}
        isValid={isValidatePassword}
      />
      {!isPassMatching ? (
        <div className="px-2 pt-1">
          <p className="font-main text-xs font-normal leading-none text-red-500">
            Password are not matching
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
        <span className="ml-2 text-left font-['Poppins'] font-main text-xs font-normal leading-none text-neutral-50">
          I have read and agree to the
          <Link
            href=""
            className="ml-1 inline-block break-words text-center font-main text-xs font-normal text-violet-400 underline"
          >
            Terms and Conditions
          </Link>
        </span>
      </div>

      <button type="submit" className="main__btn mt-32 px-6 py-3">
        Next step
      </button>
    </form>
  );
}
