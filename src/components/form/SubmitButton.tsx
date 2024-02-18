import { useFormStatus } from "react-dom";

export function SubmitButton({ buttonTitle }: { buttonTitle: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className={`main__btn ${
        pending ? "bg-opacity-10 text-zinc-500" : ""
      } mt-32 px-6 py-3`}
    >
      {buttonTitle}
    </button>
  );
}
