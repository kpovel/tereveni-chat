import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import lock from "public/lock.svg";
import { TogglePassword } from "./PasswordInput";
import { ErrorMessage } from "./internal/errorMessage";

export function ConfigmPasswordInput({
  placeholder,
  errorMessage,
}: {
  placeholder: string;
  errorMessage: string[];
}) {
  const [isHidden, setIsHidden] = useState(true);
  const [showError, setShowError] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const redBorder = "border-[#FF453A]";

  useEffect(() => {
    setShowError(true);
    const passwordInput = document.getElementsByName("password")[0];

    if (errorMessage[0]) {
      ref.current?.classList.add(redBorder);
      passwordInput.classList.add(redBorder);
    }
  }, [errorMessage]);

  function handleOnBlur() {
    ref.current?.classList.remove(redBorder);
  }

  function handleOnFocus() {
    setShowError(false);
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
          name="confirmPassword"
          placeholder={placeholder}
        />
        <TogglePassword isHidden={isHidden} setIsHidden={setIsHidden} />
      </label>
      <div className="whitespace-pre-line text-balance px-2 pt-1 text-xs">
        <ErrorMessage showError={showError} errorMessage={errorMessage[0]} />
      </div>
    </div>
  );
}
