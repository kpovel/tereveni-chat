import Image from "next/image";
import mailLogo from "public/mail.svg";
import { useEffect, useRef } from "react";

export function EmailInput({
  placeholder,
  errorMessage,
}: {
  placeholder: string;
  errorMessage: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const redBorder = "border-[#FF453A]";

  useEffect(() => {
    if (errorMessage) {
      ref.current?.classList.add(redBorder);
    }
  });

  function removeRedBorder() {
    ref.current?.classList.remove(redBorder);
  }

  return (
    <div>
      <label className="relative flex items-center">
        <Image src={mailLogo} alt="Mail logo" className="absolute left-5" />
        <input
          ref={ref}
          onBlur={removeRedBorder}
          className="w-full rounded-3xl border border-[#444] bg-[#1F1F1F] py-3.5
          pl-14 pr-5 leading-normal outline-none transition ease-in
          autofill:filter-none invalid:border-[#FF453A] focus:border-[#7C01F6]"
          type="email"
          name="email"
          placeholder={placeholder}
        />
      </label>
      {errorMessage && (
        <div className="px-2 pt-1 text-xs text-[#FF453A]">{errorMessage}</div>
      )}
    </div>
  );
}
