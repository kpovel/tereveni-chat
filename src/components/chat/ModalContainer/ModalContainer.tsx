import { useClickOutside } from "@/util/useClickOutside";
import ModalChilden from "./ModalChildren";

export type ModalContentType =
  | "InvitationLink"
  | "ConfirmationDeleting"
  | "CompleteDeleting"
  | null;

export default function ModalContainer({
  openModal,
  childrenElem,
  chatRoomUuid,
  lang,
}: {
  openModal: (content: ModalContentType) => void;
  childrenElem: ModalContentType;
  chatRoomUuid: string;
  lang: string;
}) {
  const ref = useClickOutside<HTMLDivElement>(hideModal);
  function hideModal() {
    openModal(null);
  }

  if (!childrenElem) {
    return null;
  }

  return (
    <div className="absolute left-0 top-0 z-50 h-dvh w-full  bg-opacity-50 bg-cover bg-fixed bg-center bg-no-repeat backdrop-blur-sm backdrop-filter">
      <div className="relative h-full">
        <div
          ref={ref}
          className="absolute left-2/4 top-2/4 h-[159px] w-[280px] -translate-x-1/2 -translate-y-[150px] transform rounded-lg bg-[#FAFAFA] p-6"
        >
          <ModalChilden
            chatRoomUuid={chatRoomUuid}
            modalType={childrenElem}
            openModal={openModal}
            lang={lang}
          />
        </div>
      </div>
    </div>
  );
}
