"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DictionaryReturnTypes } from "@/app/[lang]/dictionaries";

export default function Introduce({
  dict,
}: {
  dict: Awaited<DictionaryReturnTypes["/en/onboarding/introduce-yourself"]>;
}) {
  const [introduce, setIntroduce] = useState("");
  const [textLength, setTextLength] = useState(0);

  const maxCharacters = 300;

  useEffect(() => {
    setTextLength(introduce.length);
  }, [introduce]);

  const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.currentTarget.value.length <= maxCharacters) {
      setIntroduce(e.currentTarget.value);
    }
  };

  return (
    <div className="mt-10">
      <textarea
        value={introduce}
        max-length="300"
        onChange={handleText}
        className="inline-flex h-[192px] w-full items-center justify-center rounded-3xl border border-neutral-700 bg-stone-900 px-5 py-3 font-main text-sm font-normal leading-tight text-neutral-50 outline-none focus:border-violet-700"
        name="introduce"
        id="introduce"
        placeholder={dict.typeHere}
      ></textarea>
      <div className="-mt-2 px-2 text-right">
        <span className="font-main text-xs font-normal leading-none text-stone-300">
          {textLength} / 300
        </span>
      </div>
      <button className="main__btn mt-24">
        <Link className="main__link" href="">
          {dict.nextStep}
        </Link>
      </button>
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
