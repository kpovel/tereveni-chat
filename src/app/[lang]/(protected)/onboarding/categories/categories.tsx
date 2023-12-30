"use client";

import { useState } from "react";
import { Category } from "./category";

// todo: fetch categories from out main backend
const initialCategories = [
  {
    categoryName: "Entertainment",
    hashtags: [
      { name: "anime", id: 1 },
      { name: "comics", id: 2 },
      { name: "languages", id: 3 },
      { name: "influensers", id: 4 },
      { name: "memes", id: 5 },
      { name: "movies", id: 6 },
      { name: "music", id: 7 },
      { name: "videogames", id: 8 },
    ],
  },
  {
    categoryName: "Lifestyle & hobbies",
    hashtags: [
      { name: "animals", id: 9 },
      { name: "beauty", id: 10 },
      { name: "fashion", id: 11 },
      { name: "hobbies", id: 12 },
      { name: "lifestyle", id: 13 },
      { name: "nature", id: 14 },
      { name: "plants", id: 15 },
      { name: "sport", id: 16 },
      { name: "subcultures", id: 17 },
    ],
  },
];

export function ChooseCategories() {
  const mappedCategories = initialCategories.map((c) => ({
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
            key={category.categoryName}
            categoryName="Entertainment"
            hashtags={category.hashtags}
            toggleHashtag={toggleHashtag}
          />
        );
      })}
    </div>
  );
}
