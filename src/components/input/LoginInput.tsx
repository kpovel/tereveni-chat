import { ChangeEvent, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import user from "public/user.svg";
import { isValidLogin } from "@/util/input-validation";

export function LoginInput({
  login,
  setLogin,
  placeholder,
}: {
  login: string;
  setLogin: Dispatch<SetStateAction<string>>;
  placeholder: string;
}) {
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setLogin(e.target.value);
  }

  return (
    <div className="relative mt-5 flex items-center">
      <Image src={user} alt="Login icon" className="absolute left-5" />
      <input
        value={login}
        onChange={handleInputChange}
        className={`main__input ${
          login.trim() && !isValidLogin(login) ? "border-red-500" : ""
        }`}
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
}
