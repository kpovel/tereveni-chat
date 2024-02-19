import { useState, MouseEvent, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import lock from "public/lock.svg";
import { EyeOpen } from "./EyeOpen";
import { EyeClosed } from "./EyeClosed";

export function PasswordInput({
  placeholder,
  errorMessage,
}: {
  placeholder: string;
  errorMessage: string;
}) {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <div>
      <label className="relative flex items-center">
        <Image src={lock} alt="lock" className="absolute left-5" />
        <input
          className="w-full justify-center gap-3 rounded-3xl border
          border-[#444] bg-[#1F1F1F] py-3.5 pl-14 pr-5 leading-normal outline-none
          transition ease-in autofill:filter-none invalid:border-[#FF453A] focus:border-[#7C01F6]"
          type={`${isHidden ? "password" : "text"}`}
          name="password"
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
      {isHidden ? <EyeOpen /> : <EyeClosed />}
    </button>
  );
}
