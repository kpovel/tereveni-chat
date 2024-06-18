import Image from "next/image";
import DoneIcon from "public/done_icon.svg";
import { ReactNode } from "react";

export default function InvitationLink({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-[280px] flex-col items-center gap-5 rounded-lg bg-white px-6 py-[30px]">
      <Image src={DoneIcon} width={60} height={60} alt="done_icon" />
      <p className="text-center text-base font-semibold text-[#050404]">
        {children}
      </p>
    </div>
  );
}
