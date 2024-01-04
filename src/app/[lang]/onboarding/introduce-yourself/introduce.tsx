"use client";

import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { DictionaryReturnTypes } from "../../dictionaries";
import { IntroducePost } from "./introducePost";

export default function Introduce({
  lang,
  dict
}: {
  lang: "en" | "uk";
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = {
      'onboardingFieldStr': introduce
    }
    await IntroducePost(data, lang)
    // const res = await fetch(`http://138.68.69.149:8080/api/user/user-about-with-onboarding/save`, {
    //   method: "POST",
    //   body: introduce,
    //   headers: {
    //       "Authorization": `Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MzcsInN1YiI6InJhaGFkaTQwNzRAdWJpbmVydC5jb20iLCJpYXQiOjE3MDQyOTUzMjAsImV4cCI6MTcwNDMwNTIyMH0.qRlazO-_cne7INpr9x4o2KL0ktt_uVcU8V8MN4oy_4w`,
    //     }
    // });

    // console.log(res)
  }

  return (
    <div className="mt-10">
      <form>
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
        <button onClick={handleSubmit} className="main__btn mt-24">
          <Link className="main__link" href="">
            {dict.nextStep}
          </Link>
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
