"use client";

import { useState } from "react";
import Image from "next/image";

interface PasswordInputProps {
  placeholder: string;
  hint: boolean;
  setPassHandler: (pass: string) => void;
}

export default function PasswordInput({
  placeholder,
  hint,
  setPassHandler,
}: PasswordInputProps) {
  const [isHidden, setIsHidden] = useState(true);
  const [isVisibleHint, setIsVisibleHint] = useState(false);

  const hiddenPassword = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setIsHidden(!isHidden);
  };

  const hintHandler = () => {
    if (hint) {
      setIsVisibleHint(true);
    }
  };

  const hiddenHint = () => {
    if (hint) {
      setIsVisibleHint(false);
    }
  };

  const setPass = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassHandler(e.currentTarget.value);
  };

  return (
    <div>
      <div className="relative mt-5">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 scale-75 transform">
          <Image src="/lock.svg" alt="lock" width={20} height={20} />
        </div>
        <input
          onChange={setPass}
          onFocus={hintHandler}
          onBlur={hiddenHint}
          className="main__input"
          type={`${isHidden ? "password" : "text"}`}
          placeholder={placeholder}
        />
        <button
          className="absolute right-5 top-1/2 -translate-y-1/2 transform"
          onClick={hiddenPassword}
        >
          <Image src="/eye-open.svg" alt="lock" width={20} height={20} />
        </button>
      </div>
      {isVisibleHint ? (
        <div className="mt-1 px-2 transition">
          <p className="text-xs font-normal leading-5 text-neutral-50">
            Password must be 6 to 72 characters and contain at least 1 capital
            letter, 1 number and 1 special character
          </p>
        </div>
      ) : null}
    </div>
  );
}
