"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import PasswordInput from "./passwordInput";

export default function SignUpForm() {
  const [isTermsChecked, setIsTermsChecked] = useState(false);

  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPassMatching, setIsPassMatching] = useState(true);

  const termsChekedHandler = () => {
    setIsTermsChecked(!isTermsChecked);
  };

  const setPassHandler = (pass: string) => {
    setPassword(pass);
  };

  const setConfirmPassHandler = (pass: string) => {
    setConfirmPassword(pass);
  };

  const checkPassMatching = () => {
    if (password) {
      setIsPassMatching(password === confirmPassword);
    }
  };

  useEffect(() => {
    checkPassMatching();
  }, [password, confirmPassword]);

  return (
    <form action="">
      <div className="relative">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 transform">
          <Image src="/user.svg" alt="mail" width={20} height={20} />
        </div>
        <input className="main__input" type="text" placeholder="Login" />
      </div>
      <div className="relative mt-5">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 transform">
          <Image src="/mail.svg" alt="mail" width={20} height={20} />
        </div>
        <input
          className="main__input"
          type="text"
          placeholder="Email address"
        />
      </div>
      <PasswordInput
        setPassHandler={setPassHandler}
        hint={true}
        placeholder={"Password"}
      />
      <PasswordInput
        setPassHandler={setConfirmPassHandler}
        hint={false}
        placeholder={"Confirm Password"}
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

      <button type="submit" className="main__btn mt-32">
        <Link className="main__link" href="">
          Next step
        </Link>
      </button>
    </form>
  );
}
