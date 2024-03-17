"use client";

import { useState, MouseEvent } from "react";
import { DictionaryReturnTypes } from "@/app/[lang]/dictionaries";
import { SkipLink } from "@/components/Link";
import { Button } from "@/components/Button";
import { HashtagCategory } from "@/app/[lang]/(protected)/onboarding/categories/onboardingHashtags";
import { submitHashtag } from "./submitHashtag";
import { redirect } from "next/navigation";
import { Category } from "./Category";

export function ChooseHashtag({
  hashtags,
  lang,
  chatUUID,
  dict,
}: {
  hashtags: HashtagCategory[];
  lang: Lang;
  chatUUID: string;
  dict: Awaited<DictionaryReturnTypes["/en/chat/create/hashtag"]>;
}) {
  const [checkedHashtag, setCheckedHashtag] = useState<number | null>(null);

  function checkHashtag(hashtagId: number) {
    setCheckedHashtag(hashtagId);
  }

  function handleSubmitCategories(e: MouseEvent) {
    e.preventDefault();
    if (checkedHashtag === null) {
      redirect(`/${lang}/chat/create/${chatUUID}/description`);
    }

    submitHashtag(lang, chatUUID, checkedHashtag);
  }

  return (
    <>
      <div className="flex grow flex-col gap-10">
        {hashtags.map((category, i) => {
          return (
            <Category
              key={i}
              category={category}
              checkHashtag={checkHashtag}
              checkedHashtagId={checkedHashtag}
            />
          );
        })}
        <div className="flex flex-col gap-5">
          <Button onClick={handleSubmitCategories}>{dict.nextStep}</Button>
          <SkipLink href={`/${lang}/chat/create/${chatUUID}/description`}>
            {dict.skip}
          </SkipLink>
        </div>
      </div>
    </>
  );
}
