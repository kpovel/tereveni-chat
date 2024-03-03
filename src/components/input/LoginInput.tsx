import Image from "next/image";
import user from "public/user.svg";
import { useEffect, useRef, useState } from "react";
import { InputHint } from "./internal/hint";
import { ErrorMessage } from "./internal/errorMessage";

export function LoginInput({
  placeholder,
  errorMessage,
  hint,
}: {
  placeholder: string;
  errorMessage: string[];
  hint: string;
}) {
  const [showHint, setShowHint] = useState(false);
  const [showError, setShowError] = useState(false);

  const ref = useRef<HTMLInputElement>(null);
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
        <Image src={user} alt="Login icon" className="absolute left-5" />
        <input
          ref={ref}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          className="w-full rounded-3xl border border-[#444] bg-[#1F1F1F] py-3.5
          pl-14 pr-5 leading-normal outline-none transition ease-in
          autofill:filter-none invalid:border-[#FF453A] focus:border-[#7C01F6]"
          type="text"
          name="login"
          placeholder={placeholder}
        />
      </label>
      <div className="px-2 pt-1 text-xs text-balance whitespace-pre-line">
        <InputHint showHint={showHint} hint={hint} />
        <ErrorMessage showError={showError} errorMessage={errorMessage[0]} />
      </div>
    </div>
  );
}
