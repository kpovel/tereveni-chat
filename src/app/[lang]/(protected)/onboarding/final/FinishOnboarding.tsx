"use client";

import { DictionaryReturnTypes } from "@/app/[lang]/dictionaries";
import Link from "next/link";
import { endOnboarding } from "./endOnboarding";

export function FinishOnboarding({
  dict,
  lang,
}: {
  dict: Awaited<DictionaryReturnTypes["/en/onboarding/final"]>;
  lang: Lang;
}) {
  return (
    <Link
      className="main__link main__btn text-center"
      href={`/${lang}/discovery`}
      onClick={() => endOnboarding()}
    >
      {dict.start}
    </Link>
  );
}
