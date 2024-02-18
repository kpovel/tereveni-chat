import { ChangeEvent, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import mailLogo from "public/mail.svg";
import { isValidEmail } from "@/util/input-validation";

export function EmailInput({
  email,
  setEmail,
  placeholder,
}: {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  placeholder: string;
}) {
  function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setEmail(e.target.value);
  }

  return (
    <div className="relative mt-5 flex items-center">
      <Image src={mailLogo} alt="Mail logo" className="absolute left-5" />
      <input
        value={email}
        onChange={handleEmailChange}
        className={`main__input ${
          email.trim() && !isValidEmail(email) ? "border-red-500" : ""
        }`}
        type="email"
        placeholder={placeholder}
      />
    </div>
  );
}
