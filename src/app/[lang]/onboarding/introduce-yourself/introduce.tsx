"use client";

import { useState } from "react";
import Link from "next/link";
import { DictionaryReturnTypes } from "../../dictionaries";
import { IntroducePost } from "./introducePost";

export default function Introduce({
  lang,
  dict,
}: {
  lang: "en" | "uk";
  dict: Awaited<DictionaryReturnTypes["/en/onboarding/introduce-yourself"]>;
}) {
  const [introduce, setIntroduce] = useState("");

  const maxCharacters = 300;

  const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textValue = e.currentTarget.value.slice(0, maxCharacters - 1);
    setIntroduce(textValue);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await IntroducePost(introduce, lang);
  };

  return (
    <div className="mt-10">
      <form>
        <textarea
          value={introduce}
          max-length={maxCharacters}
          onChange={handleText}
          className="inline-flex h-[192px] w-full items-center justify-center rounded-3xl border border-neutral-700 bg-stone-900 px-5 py-3 font-main text-sm font-normal leading-tight text-neutral-50 outline-none focus:border-violet-700"
          name="introduce"
          id="introduce"
          placeholder={dict.typeHere}
        ></textarea>
        <div className="-mt-2 px-2 text-right">
          <span className="font-main text-xs font-normal leading-none text-stone-300">
            {introduce.length} / {maxCharacters}
          </span>
        </div>
        <button
          disabled={introduce.trim() === ""}
          onClick={handleSubmit}
          className={`main__btn main__link mt-24 ${
            introduce.trim() === "" && "bg-opacity-10 text-zinc-500"
          }`}
        >
          {dict.nextStep}
        </button>
      </form>

      <button className="mt-5 w-full border-none bg-transparent outline-none">
        <Link
          className="text-center font-main text-sm font-normal leading-tight text-stone-300"
          href=""
        >
          {dict.skip}
        </Link>
      </button>
    </div>
  );
}
