"use client"

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import ChevronRight from "public/account/chevron-right.svg";

export function ExitMenuButton() {
  const params = useParams<{ lang: Lang }>();

  return (
    <Link href={`/${params.lang}/chat/${params.chatId}`}>
      <Image src={ChevronRight} alt="Exit chat-menu" className="rotate-180" />
    </Link>
  );
}
