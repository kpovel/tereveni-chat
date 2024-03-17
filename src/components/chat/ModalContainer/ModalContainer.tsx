import ModalChilden from "./ModalChildren";

export type ModalContentType =
  | "InvitationLink"
  | "ConfirmationDeleting"
  | "CompleteDeleting"
  | null;

export default function ModalContainer({
  openModal,
  childrenElem,
  elemRef,
}: {
  openModal: (content: ModalContentType) => void;
  childrenElem: ModalContentType;
  elemRef: any;
}) {
  if (!childrenElem) {
    return;
  }

  return (
    <div className="absolute left-0 z-10 h-full w-full bg-opacity-50 bg-cover bg-fixed bg-center bg-no-repeat backdrop-blur-sm backdrop-filter">
      <div className="relative h-full">
        <div
          ref={elemRef}
          className="absolute left-2/4 top-2/4 h-[159px] w-[280px] -translate-x-[50%] -translate-y-[50%] rounded-lg bg-[#FAFAFA] p-6"
        >
          <ModalChilden childrenElem={childrenElem} openModal={openModal} />
        </div>
      </div>
    </div>
  );
}
