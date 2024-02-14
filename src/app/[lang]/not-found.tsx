import Link from "next/link";
import { ReactNode } from "react";

export default function NotFound({ params }: { params: { lang: Lang } }) {
  return (
    <div className="flex h-screen flex-col justify-between bg-[url(/404.gif)] bg-cover bg-center bg-no-repeat object-cover px-6 pb-10 pt-[74px]">
      <h2 className="px-3 text-center">
        Sorry, but the page you are trying to visit does not exist or is not
        available
      </h2>
      <div className="flex flex-col gap-5">
        <Link href="/">
          <Button>Return Home</Button>
        </Link>
        <Link href="/">
          <Button>Contact support</Button>
        </Link>
      </div>
    </div>
  );
}

export function Button({ children }: { children: ReactNode }) {
  return (
    <button className="w-full rounded-[100px] bg-[#7C01F6] py-[17px] text-center">
      {children}
    </button>
  );
}
