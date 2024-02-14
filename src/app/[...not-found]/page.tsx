import { cookies } from "next/headers";
import Link from "next/link";
import { ReactNode } from "react";

export default async function Page() {
  const lang = cookies().get("lang")?.value ?? "en";
  const dict = await getDict(lang);

  return (
    <div
      className="flex h-screen flex-col justify-between bg-[url(/404.gif)]
      bg-cover bg-center bg-no-repeat object-cover px-6 pb-10 pt-[74px] text-white"
    >
      <h2 className="px-3 text-center text-[#FAFAFA]">
        {dict.pageDoesntExist}
      </h2>
      <div className="flex flex-col gap-5">
        <Link href={`/${lang}`}>
          <Button>{dict.backHome}</Button>
        </Link>
        <Link href="mailto:chat.creators.01@gmail.com">
          <Button>{dict.contactSupport}</Button>
        </Link>
      </div>
    </div>
  );
}

function Button({ children }: { children: ReactNode }) {
  return (
    <button className="w-full rounded-[100px] bg-[#7C01F6] py-[17px] text-center">
      {children}
    </button>
  );
}

async function getDict(lang: string) {
  if (lang === "uk") {
    // todo: update translation
    return await import("./uk.json");
  }

  return await import("./en.json");
}
