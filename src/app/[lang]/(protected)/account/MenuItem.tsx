import { HTMLAttributeAnchorTarget, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import ChevronRight from "public/account/chevron-right.svg";

export function MenuItem({ children, href, img, target, rel }: MenuItemProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-[32px] border border-[#3E205D] p-4"
      target={target}
      rel={rel}
    >
      <Image src={img.src} alt={img.alt} />
      <span className="grow">{children}</span>
      <Image src={ChevronRight} alt="Chevron right" />
    </Link>
  );
}

type MenuItemProps = {
  children: ReactNode;
  href: string;
  target?: HTMLAttributeAnchorTarget | undefined;
  rel?: string | undefined;
  img: {
    src: any;
    alt: string;
  };
};

export function MenuItemLogOut({
  children,
  img,
}: {
  children: ReactNode;
  img: {
    src: any;
    alt: string;
  };
}) {
  return (
    <div className="flex items-center gap-3 rounded-[32px] border border-[#3E205D] p-4">
      <Image src={img.src} alt={img.alt} />
      <span className="grow">{children}</span>
    </div>
  );
}
