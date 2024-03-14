import { HashtagCategory } from "@/app/[lang]/(protected)/onboarding/categories/onboardingHashtags";

export function Category({
  category,
  checkHashtag,
  checkedHashtagId,
}: {
  category: HashtagCategory;
  checkHashtag: (hashtagId: number) => void;
  checkedHashtagId: number | null;
}) {
  return (
    <div className="flex flex-col gap-5 text-neutral-50">
      {category.name && <h4 className="text-sm">{category.name}</h4>}
      <div className="flex flex-wrap gap-3 text-xs">
        {category.hashtags.map((hashtag) => {
          return (
            <button
              key={hashtag.id}
              className={
                "rounded-3xl border px-4 py-2 text-center " +
                (checkedHashtagId &&
                  hashtag.id !== checkedHashtagId &&
                  " border-[#C2C2C2] text-[#C2C2C2]") +
                (hashtag.id === checkedHashtagId
                  ? " border-[#7C01F6] bg-[#7C01F6]"
                  : " border-neutral-50")
              }
              onClick={() => checkHashtag(hashtag.id)}
            >
              #{hashtag.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
