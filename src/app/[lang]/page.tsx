import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "./dictionaries";
import { ToggleLang } from "./ToggleLang";

export default async function Home({
  params,
}: {
  params: { lang: "uk" | "en" };
}) {
  const dict = await getDictionary(`/${params.lang}`);

  return (
    <div className="container mx-auto px-6">
      <ToggleLang />
      <div className="my-10 inline-flex w-full items-center justify-center px-4 py-10">
        <Image src="logo.svg" alt="logo" width={200} height={207} />
      </div>
      <h1 className="text-center font-main text-3xl font-medium text-neutral-50">
        {dict.mainPage.title}
      </h1>
      <div className="mt-10 flex flex-col items-center">
        <button className="main__btn mb-5">
          <Link className="main__link" href={`/${params.lang}/login`}>
            Log in
          </Link>
        </button>
        <button className="main__btn">
          <Link className="main__link" href={`/${params.lang}/sign-up`}>
            signUp
          </Link>
        </button>
      </div>
    </div>
  );
}
