import { ChatListHeader } from "@/components/chat/ChatListHeader";
import UserProfile from "public/account/user-profile-02.svg";
import ChevronRight from "public/account/chevron-right.svg";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

export default function Account({ params }: { params: { lang: Lang } }) {
  return (
    <>
      <ChatListHeader lang={params.lang} />
      <main className="px-6 py-10">
        <div>
          <MenuItem
            href={`/${params.lang}/account/profile`}
            img={{ src: UserProfile, alt: "User profile" }}
          >
            My profile
          </MenuItem>
        </div>
      </main>
    </>
  );
}

function MenuItem({
  children,
  href,
  img,
}: {
  children: ReactNode;
  href: string;
  img: {
    src: any;
    alt: string;
  };
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-[32px] border border-[#3E205D] p-4"
    >
      <Image src={img.src} alt={img.alt} />
      <span className="grow">{children}</span>
      <Image src={ChevronRight} alt="Chevron right" />
    </Link>
  );
}
