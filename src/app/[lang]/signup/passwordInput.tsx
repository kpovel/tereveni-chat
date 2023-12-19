"use client";

import { useState } from "react";
import Image from "next/image";
import { DictionaryReturnTypes } from "../dictionaries";

interface PasswordInputProps {
  placeholder: string;
  hint: boolean;
  setPassHandler: (pass: string) => void;
  pass: string;
  isValid?: boolean;
  dict: Awaited<DictionaryReturnTypes["/en/signup"]>;
}

export default function PasswordInput({
  placeholder,
  hint,
  pass,
  isValid,
  dict,
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
          className={`main__input ${!isValid ? "border-red-500" : null}`}
          type={`${isHidden ? "password" : "text"}`}
          placeholder={placeholder}
          value={pass}
        />
        <button
          className="absolute right-5 top-1/2 -translate-y-1/2 transform"
          onClick={hiddenPassword}
        >
          <Image src="/eye-open.svg" alt="lock" width={20} height={20} />
        </button>
      </div>
      {isVisibleHint && (
        <div className="mt-1 px-2 transition">
          <p className="text-xs font-normal leading-5 text-neutral-50">
            {dict.errorStatus.passwordConstraint}
          </p>
        </div>
      )}
    </div>
  );
}
