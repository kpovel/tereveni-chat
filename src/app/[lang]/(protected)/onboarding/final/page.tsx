import Link from "next/link";
import Image from "next/image";
import { getDictionary } from "@/app/[lang]/dictionaries";

export default async function OnboardingFinal({
  params,
}: {
  params: { lang: "uk" | "en" };
}) {
  const dict = await getDictionary(`/${params.lang}/onboarding/final`);
  const login = "Login";

  return (
    <main className="container mx-auto flex h-screen max-w-md flex-col justify-between gap-10 px-6 py-10">
      <div className="flex flex-col items-center gap-[3.75rem]">
        <h2 className="text-center text-[1.75rem] font-medium text-neutral-50">
          {dict.welcome}, {login}!
        </h2>
        <Image src="/Preview.svg" width={200} height={200} alt="user avatar" />
      </div>
      <Link
        className="main__link main__btn text-center"
        href={`/${params.lang}/chat`}
      >
        {dict.start}
      </Link>
    </main>
  );
}
