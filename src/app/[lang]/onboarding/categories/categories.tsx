"use client";

import { useState, MouseEvent } from "react";
import { Category } from "./category";
import { Hashtag } from "./onboardingHashtags";
import Link from "next/link";
import { DictionaryReturnTypes } from "../../dictionaries";
import { submitCategories } from "./submitCategories";

export function ChooseCategories({
  hashtags,
  lang,
  dict,
}: {
  hashtags: Hashtag[];
  lang: "en" | "uk";
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
      <div className="flex flex-col gap-10">
        {categories.map((category) => {
          return (
            <Category
              key={category.name}
              categoryName={category.name}
              hashtags={category.hashtags}
              toggleHashtag={toggleHashtag}
            />
          );
        })}
        <div className="flex flex-col gap-5">
          <button
            className="main__link main__btn text-center"
            onClick={handleSubmitCategories}
          >
            {dict.nextStep}
          </button>
          <Link
            className="mx-auto px-5 text-center text-sm text-[#C2C2C2]"
            href={`/${lang}/onboarding/final`}
          >
            {dict.skip}
          </Link>
        </div>
      </div>
    </>
  );
}
