import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import lock from "public/lock.svg";
import { TogglePassword } from "./PasswordInput";

export function ConfigmPasswordInput({
  placeholder,
  errorMessage,
}: {
  placeholder: string;
  errorMessage: string;
}) {
  const [isHidden, setIsHidden] = useState(true);
  const ref = useRef<HTMLInputElement>(null);
  const redBorder = "border-[#FF453A]";

  useEffect(() => {
    const passwordInput = document.getElementsByName("password")[0];

    if (errorMessage) {
      ref.current?.classList.add(redBorder);
      passwordInput.classList.add(redBorder);
    }
  });

  function removeRedBorder() {
    ref.current?.classList.remove(redBorder);
  }

  return (
    <div>
      <label className="relative flex items-center">
        <Image src={lock} alt="lock" className="absolute left-5" />
        <input
          ref={ref}
          onBlur={removeRedBorder}
          className="w-full rounded-3xl border border-[#444] bg-[#1F1F1F] py-3.5
          pl-14 pr-5 leading-normal outline-none transition ease-in
          autofill:filter-none invalid:border-[#FF453A] focus:border-[#7C01F6]"
          type={`${isHidden ? "password" : "text"}`}
          name="confirmPassword"
          placeholder={placeholder}
        />
        <TogglePassword isHidden={isHidden} setIsHidden={setIsHidden} />
      </label>
      {errorMessage && (
        <div className="whitespace-pre-line px-2 pt-1 text-xs text-[#FF453A]">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
