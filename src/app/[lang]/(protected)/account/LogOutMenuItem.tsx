import { Dispatch, ReactNode, SetStateAction } from "react";
import Image from "next/image";

export function LogOutMenuItem({
  children,
  img,
  setOpenConfirmLogout,
}: {
  setOpenConfirmLogout: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  img: {
    src: any;
    alt: string;
  };
}) {
  function configmLogout() {
    setOpenConfirmLogout(true);
  }

  return (
    <>
      <button
        className="flex items-center gap-3 rounded-[32px] border border-[#3E205D] p-4"
        onClick={configmLogout}
      >
        <Image src={img.src} alt={img.alt} />
        <span className="grow text-start">{children}</span>
      </button>
    </>
  );
}


