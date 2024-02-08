import { ReactNode } from "react";

export default function InfoLayout({ children }: { children: ReactNode }) {
  return (
    <main className="w-full px-6 pb-[40px] pt-[78px]">
      <div className="prose mx-auto items-stretch text-white">{children}</div>
    </main>
  );
}
