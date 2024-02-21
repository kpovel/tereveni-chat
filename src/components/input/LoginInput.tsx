import Image from "next/image";
import user from "public/user.svg";
import { useEffect, useRef } from "react";

export function LoginInput({
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
    console.log("fired", errorMessage);
      ref.current?.classList.add(redBorder);
    }
  });

  function removeRedBorder() {
    ref.current?.classList.remove(redBorder);
  }

  return (
    <div>
      <label className="relative flex items-center">
        <Image src={user} alt="Login icon" className="absolute left-5" />
        <input
          ref={ref}
          onBlur={removeRedBorder}
          className="w-full rounded-3xl border border-[#444] bg-[#1F1F1F] py-3.5
          pl-14 pr-5 leading-normal outline-none transition ease-in
          autofill:filter-none invalid:border-[#FF453A] focus:border-[#7C01F6]"
          type="text"
          name="login"
          placeholder={placeholder}
        />
      </label>
      {errorMessage && (
        <div className="whitespace-pre-line px-2 pt-1 text-xs text-[#FF453A]">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
