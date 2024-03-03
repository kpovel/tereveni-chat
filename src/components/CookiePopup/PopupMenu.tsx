import { DictionaryReturnTypes } from "@/app/[lang]/dictionaries";
import Link from "next/link";
import { Button } from "../Button";

export function PopupMenu({
  closePopup,
  dict,
  lang,
}: {
  closePopup: () => void;

  dict: Awaited<DictionaryReturnTypes["components/en/CookiePopup"]>;
  lang: "en" | "uk";
}) {
  return (
    <div className="absolute bottom-0 left-0 flex w-full flex-col gap-5 rounded-t-[32px] bg-[#050404] px-6 py-10">
      <div>
        <p className="text-center text-white">{dict.usesCookies}</p>
        <div className="w-full pt-2 text-center">
          <Link
            href={`/${lang}/cookies-policy`}
            className="text-[#7C01F6] underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {dict.learnMore}
          </Link>
        </div>
      </div>
      <Button onClick={closePopup}>{dict.gotIt}</Button>
    </div>
  );
}
