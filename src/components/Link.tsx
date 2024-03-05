import { LinkProps } from "next/dist/client/link";
import Link from "next/link";
import { ReactNode } from "react";

type Props = LinkProps & { children: ReactNode };

export function StyledLink({ children, ...attributes }: Props) {
  return (
    <Link
      className="w-full rounded-full bg-[#7C01F6] px-6 py-4 text-center text-white"
      {...attributes}
    >
      {children}
    </Link>
  );
}

export function SkipLink({ children, ...attributes }: Props) {
  return (
    <Link
      className="text-center text-sm font-normal leading-tight text-[#C2C2C2]"
      {...attributes}
    >
      {children}
    </Link>
  );
}
