import Image from "next/image";

import DoneIcon from "public/done_icon.svg";

export default function CompleteDeleting() {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-5">
        <Image src={DoneIcon} width={60} height={60} alt="done_icon" />
      </div>
      <p className="text-center text-base font-semibold text-[#050404]">
        Chat successfully deleted
      </p>
    </div>
  );
}
