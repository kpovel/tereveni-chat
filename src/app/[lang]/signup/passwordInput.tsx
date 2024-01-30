import {
  useState,
  MouseEvent,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";
import Image from "next/image";
import { isValidPassword } from "@/util/input-validation";
import lock from "public/lock.svg";
import eyeOpen from "public/eye-open.svg";
import eyeClosed from "public/eye-closed.svg";

interface PasswordInputProps {
  pass: string;
  setPass: Dispatch<SetStateAction<string>>;
  placeholder: string;
  hint: boolean;
  passwordConstraint?: string;
}

export default function PasswordInput({
  pass,
  setPass,
  placeholder,
  hint,
  passwordConstraint,
}: PasswordInputProps) {
  const [isHidden, setIsHidden] = useState(true);
  const [isVisibleHint, setIsVisibleHint] = useState(false);

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

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setPass(e.target.value);
  }

  return (
    <>
      <div className="relative mt-5 flex items-center">
        <Image src={lock} alt="lock" className="absolute left-5 " />
        <input
          onChange={handlePasswordChange}
          onFocus={hintHandler}
          onBlur={hiddenHint}
          className={`main__input ${
            pass.trim() && !isValidPassword(pass) ? "border-red-500" : ""
          }`}
          type={`${isHidden ? "password" : "text"}`}
          placeholder={placeholder}
          value={pass}
        />
        <TogglePassword isHidden={isHidden} setIsHidden={setIsHidden} />
      </div>
      {isVisibleHint && (
        <div className="mt-1 px-2 transition">
          <p className="text-xs font-normal leading-5 text-neutral-50">
            {passwordConstraint}
          </p>
        </div>
      )}
    </>
  );
}

function TogglePassword({
  isHidden,
  setIsHidden,
}: {
  isHidden: boolean;
  setIsHidden: Dispatch<SetStateAction<boolean>>;
}) {
  function togglePasswordVisibility(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsHidden(!isHidden);
  }

  return (
    <button className="absolute right-5" onClick={togglePasswordVisibility}>
      {isHidden ? (
        <Image src={eyeOpen} alt="show password" className="h-5 w-5" />
      ) : (
        <Image
          src={eyeClosed}
          alt="hide password"
          className="h-5 w-5 rotate-180"
        />
      )}
    </button>
  );
}
