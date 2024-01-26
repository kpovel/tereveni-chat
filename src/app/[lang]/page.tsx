import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "./dictionaries";
import { ToggleLang } from "./ToggleLang";
import tereveniLogo from "public/logo.svg";
import { CookiePopup } from "@/components/CookiePopup";

export default async function Home({
  params,
}: {
  params: { lang: "uk" | "en" };
}) {
  const dict = await getDictionary(`/${params.lang}`);

  return (
    <div>
      <div className="container mx-auto px-6">
        <ToggleLang />
        <div className="inline-flex w-full items-center justify-center px-4 py-20">
          <Image src={tereveniLogo} alt="Tereveni Logo" />
        </div>
        <h1 className="text-center text-[28px] font-medium text-neutral-50">
          {dict.mainPage.title}
        </h1>
        <div className="mt-10 flex flex-col items-center">
          <button className="main__btn mb-5">
            <Link className="main__link" href={`/${params.lang}/login`}>
              {dict.mainPage.btnLogin}
            </Link>
          </button>
          <button className="main__btn">
            <Link className="main__link" href={`/${params.lang}/signup`}>
              {dict.mainPage.btnSignUp}
            </Link>
          </button>
        </div>
      </div>
      <CookiePopup lang={params.lang} />
    </div>
  );
}
