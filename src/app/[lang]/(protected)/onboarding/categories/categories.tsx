"use client";

import { useState, MouseEvent } from "react";
import { Category } from "./category";
import { Hashtag } from "./onboardingHashtags";
import { DictionaryReturnTypes } from "@/app/[lang]/dictionaries";
import { submitCategories } from "./submitCategories";
import { SkipLink } from "@/components/Link";
import { Button } from "@/components/Button";

export function ChooseCategories({
  hashtags,
  lang,
  dict,
}: {
  hashtags: Hashtag[];
  lang: Lang;
  dict: Awaited<DictionaryReturnTypes["/en/onboarding/categories"]>;
}) {
  const mappedCategories = hashtags.map((c) => ({
    ...c,
    hashtags: c.hashtags.map((h) => ({ ...h, checked: false })),
  }));
  const [categories, setCategories] = useState(mappedCategories);

  function toggleHashtag(hashtagId: number) {
    setCategories(
      categories.map((category) => {
        return {
          ...category,
          hashtags: category.hashtags.map((hashtag) => {
            if (hashtag.id === hashtagId) {
              return {
                ...hashtag,
                checked: !hashtag.checked,
              };
            }
            return hashtag;
          }),
        };
      }),
    );
  }

  function handleSubmitCategories(e: MouseEvent) {
    e.preventDefault();
    const checkedCategories = categories.flatMap((c) => {
      return c.hashtags
        .filter((h) => h.checked)
        .map((h) => ({
          id: h.id,
        }));
    });

    submitCategories(lang, checkedCategories);
  }

  return (
    <>
      <div className="flex grow flex-col gap-10">
        {categories.map((category, i) => {
          return (
            <Category
              key={i}
              categoryName={category.name}
              hashtags={category.hashtags}
              toggleHashtag={toggleHashtag}
            />
          );
        })}
        <div className="flex flex-col gap-5">
          <Button onClick={handleSubmitCategories}>{dict.nextStep}</Button>
          <SkipLink href={`/${lang}/onboarding/final`}>{dict.skip}</SkipLink>
        </div>
      </div>
    </>
  );
}
