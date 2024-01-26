import { DictionaryReturnTypes } from "@/app/[lang]/dictionaries";
import Link from "next/link";

export function PopupMenu({
  closePopup,
  dict,
}: {
  closePopup: () => void;

  dict: Awaited<DictionaryReturnTypes["components/en/CookiePopup"]>;
}) {
  return (
    <div className="absolute bottom-0 left-0 w-full rounded-t-[32px] bg-[#050404] px-10 py-6">
      <p className="text-center text-white">{dict.usesCookies}</p>
      {/* todo: update link */}
      <div className="w-full pt-2 text-center">
        <Link href="" className="text-[#7C01F6] underline">
          {dict.learnMore}
        </Link>
      </div>
      <button
        className="mt-5 w-full rounded-full bg-[#7C01F6] px-6 py-3 text-white"
        onClick={closePopup}
      >
        {dict.gotIt}
      </button>
    </div>
  );
}
