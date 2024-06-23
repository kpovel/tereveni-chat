import Image from "next/image";
import UnBlockIcon from "/public/chat/unblock.svg";

export function BlockedMemberContext({
  openContext,
  openModal,
}: any 
// {
//   openContext: boolean;
//   openModal: (content: ModalContentType) => void;
// }
) {
  return (
    <div className={"absolute right-0 top-[38px] z-10 flex " + (openContext ? "block" : "hidden")}>
      <button
        onClick={() => openModal("ConfirmationDeleting")}
        className="w-[164px] flex gap-2 rounded-lg
        bg-[#1F1F1F] px-4 py-[15px] shadow-[0px_8px_10px_1px_rgba(0,_0,_0,_0.12)]"
      >
        {/* <TrashIcon /> */}
        <Image src={UnBlockIcon} alt="block" />
        Unblock
      </button>
    </div>
  );
}