import Image from "next/image";
import { getDictionary } from "./dictionaries";
import { ToggleLang } from "./ToggleLang";
import tereveniLogo from "public/logo.svg";
import { StyledLink } from "@/components/Link";

export default async function Home({
  params,
}: {
  params: { lang: "uk" | "en" };
}) {
  const dict = await getDictionary(`/${params.lang}`);

  return (
    <div className="container mx-auto px-6">
      <ToggleLang />
      <div className="inline-flex w-full items-center justify-center px-4 py-20">
        <Image src={tereveniLogo} alt="Tereveni Logo" />
      </div>
      <h1 className="text-center text-[28px] font-medium text-neutral-50">
        {dict.mainPage.title}
      </h1>
      <div className="mx-auto mt-10 flex max-w-md flex-col gap-5">
        <StyledLink href={`/${params.lang}/login`}>
          {dict.mainPage.btnLogin}
        </StyledLink>
        <StyledLink href={`/${params.lang}/signup`}>
          {dict.mainPage.btnSignUp}
        </StyledLink>
      </div>
    </div>
  );
}
