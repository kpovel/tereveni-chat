import { DictionaryReturnTypes } from "@/app/[lang]/dictionaries";
import Image from "next/image";
import Link from "next/link";
import ChevronRight from "public/account/chevron-right.svg";

export function ProfileHeader(props: {
  lang: Lang;
  dict: Awaited<DictionaryReturnTypes["/en/account/profile/edit"]>;
}) {
  return (
    <div className="flex flex-row items-center justify-between">
      <Link href={`/${props.lang}/account/profile`}>
        <Image src={ChevronRight} alt="Chevron left" className="rotate-180" />
      </Link>
      <h1 className="text-lg font-medium">{props.dict.title}</h1>
      <div></div>
    </div>
  );
}
