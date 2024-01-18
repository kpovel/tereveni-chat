export function Category({
  categoryName,
  hashtags,
  toggleHashtag,
}: {
  categoryName: string;
  hashtags: { name: string; id: number; checked: boolean }[];
  toggleHashtag: (hashtagId: number) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <h4 className="text-sm text-neutral-50">{categoryName}</h4>
      <div className="flex flex-wrap gap-3">
        {hashtags.map((hashtag) => {
          return (
            <button
              key={hashtag.id}
              className={`rounded-3xl border px-4 py-2 text-center text-xs text-neutral-50 ${
                hashtag.checked
                  ? "border-[#7C01F6] bg-[#7C01F6]"
                  : "border-neutral-50"
              }`}
              onClick={() => toggleHashtag(hashtag.id)}
            >
              #{hashtag.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
