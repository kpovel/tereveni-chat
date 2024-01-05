"use client";

import { useState } from "react";
import { Category } from "./category";
import { Hashtag } from "./onboardingHashtags";

export function ChooseCategories({ hashtags }: { hashtags: Hashtag[] }) {
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

  return (
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
    </div>
  );
}
