import Image from "next/image";
import mailLogo from "public/mail.svg";

export function EmailInput({
  placeholder,
  errorMessage,
}: {
  placeholder: string;
  errorMessage: string;
}) {
  return (
    <div>
      <label className="relative flex items-center">
        <Image src={mailLogo} alt="Mail logo" className="absolute left-5" />
        <input
          className="w-full justify-center gap-3 rounded-3xl border
          border-[#444] bg-[#1F1F1F] py-3 pl-14 pr-5 leading-normal outline-none
          transition ease-in invalid:border-[#FF453A] focus:border-[#7C01F6] autofill:filter-none"
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
