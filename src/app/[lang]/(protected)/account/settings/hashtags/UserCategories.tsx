"use client";

import { useState, MouseEvent } from "react";
import { DictionaryReturnTypes } from "@/app/[lang]/dictionaries";
import { Button } from "@/components/Button";
import { Category } from "../../../onboarding/categories/category";
import { UserHashtags } from "./page";
import { putUserHashtags } from "./putUserHashtags";

export function UserCategories({
  hashtags,
  lang,
  dict,
}: {
  hashtags: UserHashtags[];
  lang: Lang;
  dict: Awaited<DictionaryReturnTypes["/en/account/settings/hashtags"]>;
}) {
  const mappedCategories = hashtags.map((c) => ({
    ...c,
    hashtags: c.hashtags.map((h) => ({ ...h, checked: h.selected })),
  }));
  const [categories, setCategories] = useState(mappedCategories);
  const [submitting, setSubmitting] = useState(false);

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

  async function handleSubmitCategories(e: MouseEvent) {
    e.preventDefault();
    const checkedCategories = categories.flatMap((c) => {
      return c.hashtags
        .filter((h) => h.checked)
        .map((h) => ({
          id: h.id,
        }));
    });

    setSubmitting(true);
    await putUserHashtags(lang, checkedCategories);
    setSubmitting(false);
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
          <Button onClick={handleSubmitCategories} disabled={submitting}>
            {dict.saveChanges}
          </Button>
        </div>
      </div>
    </>
  );
}
