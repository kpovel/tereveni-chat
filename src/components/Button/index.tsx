import { ButtonHTMLAttributes, ReactNode } from "react";

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
  children: ReactNode;
};

export function Button({ children, ...attributes }: Props) {
  return (
    <button
      className="w-full rounded-full bg-[#7C01F6] px-6 py-4 text-white
        disabled:bg-[rgba(124,_1,_246,_0.12)] disabled:text-[#79767A]"
      {...attributes}
    >
      {children}
    </button>
  );
}
