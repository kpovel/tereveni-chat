import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import ChevronRight from "public/account/chevron-right.svg";

export function ExitChatButton() {
  const params = useParams<{ lang: Lang }>();

  return (
    <Link href={`/${params.lang}/chat/all`}>
      <Image src={ChevronRight} alt="Exit chat" className="rotate-180" />
    </Link>
  );
}
