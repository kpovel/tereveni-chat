import { ReactNode } from "react";
import CompleteDeleting from "./CompleteDeleting";

export default function ConfirmationDeleting({
  openModal,
  setIsModalOpen,
}: {
  openModal: (content: null | string) => void;
  setIsModalOpen: (value: boolean) => void;
}) {

  const COMPLETE_DELETING = "CompleteDeleting"

  return (
    <div>
      <h4 className="mb-3 text-base font-semibold text-[#050404]">
        Are you sure you want to permanently delete this chat?
      </h4>
      <p className="text-xs font-normal text-[#050404]">
        The chat will be deleted for you only
      </p>
      <div className="mt-6 flex w-full justify-end">
        <button
          onClick={() => openModal(COMPLETE_DELETING)}
          className="mr-10 h-5 w-[26px] bg-none text-base font-semibold text-[#FF453A]"
        >
          yes
        </button>
        <button
          onClick={() => setIsModalOpen(false)}
          className="h-5 w-[26px] bg-none text-base font-semibold text-[#050404]"
        >
          no
        </button>
      </div>
    </div>
  );
}
