import { TrashIcon } from "./TrashIcon";
import { ModalContentType } from "../ModalContainer/ModalContainer";
import { LeaveIcon } from "./LeaveIcon";

export function MessageContextList({
  openContext,
  openModal,
  dict,
  isAdmin,
}: {
  openContext: boolean;
  openModal: (content: ModalContentType) => void;
  dict: {
    deleteChat: string;
    leaveChat: string;
  };
  isAdmin: boolean;
}) {
  return (
    <div className={"relative " + (openContext ? "block" : "hidden")}>
      {isAdmin && (
        <button
          onClick={() => openModal("ConfirmationDeleting")}
          className="absolute right-0 top-1 z-10 flex w-[164px] gap-2 rounded-lg
        bg-[#1F1F1F] px-4 py-[15px] shadow-[0px_8px_10px_1px_rgba(0,_0,_0,_0.12)]"
        >
          <TrashIcon />
          {dict.deleteChat}
        </button>
      )}
      {!isAdmin && (
        <button
          onClick={() => openModal("LeaveChat")}
          className="absolute right-0 top-1 z-10 flex w-[164px] gap-2 rounded-lg
        bg-[#1F1F1F] px-4 py-[15px] shadow-[0px_8px_10px_1px_rgba(0,_0,_0,_0.12)]"
        >
          <LeaveIcon />
          {dict.leaveChat}
        </button>
      )}
    </div>
  );
}
