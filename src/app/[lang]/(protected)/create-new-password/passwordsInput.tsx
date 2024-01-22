import { useState, MouseEvent, ChangeEvent } from "react";
import Image from "next/image";
import { DictionaryReturnTypes } from "../../dictionaries";
import { isValidPassword } from "@/util/input-validation";

interface PasswordInputProps {
  placeholder: string;
  hint: boolean;
  setPassHandler: (pass: string) => void;
  pass: string;
  dict: Awaited<DictionaryReturnTypes["/en/signup"]>;
}

export default function PasswordsInput({
  placeholder,
  hint,
  pass,
  dict,
  setPassHandler,
}: PasswordInputProps) {
  const [isHidden, setIsHidden] = useState(true);
  const [isVisibleHint, setIsVisibleHint] = useState(false);

  function hiddenPassword(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsHidden(!isHidden);
  }

  function hintHandler() {
    if (hint) {
      setIsVisibleHint(true);
    }
  }

  function hiddenHint() {
    if (hint) {
      setIsVisibleHint(false);
    }
  }

  function setPass(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setPassHandler(e.currentTarget.value);
  }

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
          className={`main__input ${
            !pass.trim() && isValidPassword(pass) ? "border-red-500" : ""
          }`}
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
