import { useFormStatus } from "react-dom";

export function SubmitButton({ buttonTitle }: { buttonTitle: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className="w-full rounded-full bg-[#7C01F6] py-[17px] text-sm
      disabled:bg-[rgba(124,_1,_246,_0.12)] disabled:text-[#79767A]"
    >
      {buttonTitle}
    </button>
  );
}
