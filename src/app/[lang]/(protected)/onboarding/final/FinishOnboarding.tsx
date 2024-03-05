"use client";

import { DictionaryReturnTypes } from "@/app/[lang]/dictionaries";
import { endOnboarding } from "./endOnboarding";
import { StyledLink } from "@/components/Link";

export function FinishOnboarding({
  dict,
  lang,
}: {
  dict: Awaited<DictionaryReturnTypes["/en/onboarding/final"]>;
  lang: Lang;
}) {
  return (
    <StyledLink href={`/${lang}/discovery`} onClick={() => endOnboarding()}>
      {dict.start}
    </StyledLink>
  );
}
