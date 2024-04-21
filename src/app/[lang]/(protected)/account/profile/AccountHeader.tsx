import { DictionaryReturnTypes } from "@/app/[lang]/dictionaries";
import Image from "next/image";
import Link from "next/link";
import ChevronRight from "public/account/chevron-right.svg";
import Edit from "public/edit-04.svg";

export function AccountHeader(props: {
  lang: Lang;
  dict: Awaited<DictionaryReturnTypes["/en/account/profile"]>;
}) {
  return (
    <div className="flex flex-row items-center justify-between">
      <Link href={`/${props.lang}/account`}>
        <Image src={ChevronRight} alt="Chevron left" className="rotate-180" />
      </Link>
      <h1 className="text-lg font-medium">{props.dict.myProfile}</h1>
      <Link href={`/${props.lang}/account/edit`}>
        <Image src={Edit} alt="Edit profile" />
      </Link>
    </div>
  );
}
