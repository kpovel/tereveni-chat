import { ModalContentType } from "../ModalContainer";

export default function ConfirmationDeleting({
  openModal,
}: {
  openModal: (content: ModalContentType) => void;
}) {
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
          onClick={() => openModal("CompleteDeleting")}
          className="mr-10 h-5 w-[26px] bg-none text-base font-semibold text-[#FF453A]"
        >
          yes
        </button>
        <button
          onClick={() => openModal(null)}
          className="h-5 w-[26px] bg-none text-base font-semibold text-[#050404]"
        >
          no
        </button>
      </div>
    </div>
  );
}
