import Image from 'next/image';
import Link from 'next/link';
import { getDictionary } from "./dictionaries";
import LangChecker from './langChecker';

export default async function Home({
  params,
}: {
  params: { lang: "uk" | "en" };
}) {
  const dict = await getDictionary(`/${params.lang}`);
  
  return (
    <div className="container mx-auto px-6">
      <div className="fixed top-1/2 left-1/2 bg-purple-900 w-[308px] h-[504px] rounded-[300px] opacity-10 blur-2xl transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-purple-600 via-purple-600 to-transparent"></div>
        <LangChecker />
        <div className="inline-flex w-full justify-center items-center py-10 px-4 my-10">
          <Image 
            src="logo.svg"
            alt="logo"
            width={200}
            height={207}
          />
        </div>
        <h1 className="text-center font-main text-neutral-50 text-3xl font-medium">{dict.title}</h1>
        <div className="mt-10 flex items-center flex-col">
          <button className="main__btn mb-5">
          <Link href="/loginPage">Log in</Link>
          </button>
          <button className="main__btn">
          <Link href="/signUp">signUp</Link>
          </button>
        </div>
    </div>
  )
}
