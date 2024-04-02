import {
  useState,
  MouseEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import Image from "next/image";
import lock from "public/lock.svg";
import { EyeOpen } from "./EyeOpen";
import { EyeClosed } from "./EyeClosed";
import { InputHint } from "../internal/hint";
import { ErrorMessage } from "../internal/errorMessage";

export function PasswordInput({
  placeholder,
  errorMessage,
  name,
  hint,
}: {
  placeholder: string;
  errorMessage: string[];
  name: string;
  hint?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [isHidden, setIsHidden] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const [showError, setShowError] = useState(false);
  const redBorder = "border-[#FF453A]";

  useEffect(() => {
    setShowError(true);
    if (errorMessage[0]) {
      ref.current?.classList.add(redBorder);
    }
  }, [errorMessage]);

  function handleOnBlur() {
    ref.current?.classList.remove(redBorder);
    setShowHint(false);
  }

  function handleOnFocus() {
    setShowError(false);
    setShowHint(true);
  }

  return (
    <div>
      <label className="relative flex items-center">
        <Image src={lock} alt="lock" className="absolute left-5" />
        <input
          ref={ref}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          className="w-full rounded-3xl border border-[#444] bg-[#1F1F1F] py-3.5
          pl-14 pr-5 leading-normal outline-none transition ease-in
          autofill:filter-none invalid:border-[#FF453A] focus:border-[#7C01F6]"
          type={`${isHidden ? "password" : "text"}`}
          name={name}
          placeholder={placeholder}
        />
        <TogglePassword isHidden={isHidden} setIsHidden={setIsHidden} />
      </label>
      <div className="whitespace-pre-line text-balance px-2 pt-1 text-xs">
        {hint && <InputHint showHint={showHint} hint={hint} />}
        <ErrorMessage showError={showError} errorMessage={errorMessage[0]} />
      </div>
    </div>
  );
}

export function TogglePassword({
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
      {isHidden ? <EyeOpen /> : <EyeClosed />}
    </button>
  );
}
