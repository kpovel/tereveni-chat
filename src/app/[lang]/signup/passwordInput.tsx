import {
  useState,
  MouseEvent,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";
import Image from "next/image";
import { DictionaryReturnTypes } from "../dictionaries";
import { isValidPassword } from "@/util/input-validation";
import lock from "public/lock.svg";
import eyeOpen from "public/eye-open.svg";
import eyeClosed from "public/eye-closed.svg";

interface PasswordInputProps {
  placeholder: string;
  hint: boolean;
  setPassHandler: (pass: string) => void;
  pass: string;
  dict: Awaited<DictionaryReturnTypes["/en/signup"]>;
}

export default function PasswordInput({
  placeholder,
  hint,
  pass,
  dict,
  setPassHandler,
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

  function setPass(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setPassHandler(e.currentTarget.value);
  }

  return (
    <div>
      <div className="mt-5 flex relative items-center">
        <Image src={lock} alt="lock" className="absolute left-5 "/>
        <input
          onChange={setPass}
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
            {dict.errorStatus.passwordConstraint}
          </p>
        </div>
      )}
    </div>
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
    <button
      className="absolute right-5"
      onClick={togglePasswordVisibility}
    >
      {isHidden ? (
        <Image src={eyeOpen} alt="show password" className="w-5 h-5" />
      ) : (
        <Image src={eyeClosed} alt="hide password" className="w-5 h-5 rotate-180"/>
      )}
    </button>
  );
}
