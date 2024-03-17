import { useEffect, useRef, useState } from "react";
import { ErrorMessage } from "../internal/errorMessage";
import { XIcon } from "./XIcon";

export function Input({
  placeholder,
  errorMessage,
}: {
  placeholder: string;
  errorMessage: string[];
}) {
  const ref = useRef<HTMLInputElement>(null);
  const redBorder = "border-[#FF453A]";
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setShowError(true);
    if (errorMessage[0]) {
      ref.current?.classList.add(redBorder);
    }
  }, [errorMessage]);

  function handleOnBlur() {
    ref.current?.classList.remove(redBorder);
  }

  function handleOnFocus() {
    setShowError(false);
  }

  function clearInput() {
    const inputElement = document.getElementById("input") as HTMLInputElement;
    inputElement.value = "";
  }

  return (
    <div>
      <label className="relative flex items-center">
        <input
          ref={ref}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          className="peer w-full rounded-3xl border border-[#444] bg-[#1F1F1F]
          py-3.5 pl-[22px] pr-[54px] leading-normal outline-none transition
          ease-in autofill:filter-none focus:border-[#7C01F6]"
          id="input"
          type="text"
          name="chat"
          placeholder={placeholder}
          required
        />
        <span
          className="visible absolute right-[22px] cursor-pointer peer-invalid:invisible"
          onClick={clearInput}
        >
          <XIcon />
        </span>
      </label>
      <div className="whitespace-pre-line text-balance px-2 pt-1 text-xs">
        <ErrorMessage showError={showError} errorMessage={errorMessage[0]} />
      </div>
    </div>
  );
}
