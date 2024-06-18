import { useClickOutside } from "@/util/useClickOutside";
import ConfirmationDeleting from "./ModalContent/ConfirmationDeleting";
import CompleteDeleting from "./ModalContent/CompleteDeleting";
import { DictionaryReturnTypes } from "@/app/[lang]/dictionaries";

export type ModalContentType =
  | "InvitationLink"
  | "ConfirmationDeleting"
  | "CompleteDeleting"
  | null;

export default function ModalContainer({
  openModal,
  modalType,
  chatRoomUuid,
  lang,
  dict,
}: {
  openModal: (content: ModalContentType) => void;
  modalType: ModalContentType;
  chatRoomUuid: string;
  lang: string;
  dict: Awaited<DictionaryReturnTypes["/en/chat/all"]>;
}) {
  const ref = useClickOutside<HTMLDivElement>(hideModal);
  function hideModal() {
    openModal(null);
  }

  if (!modalType) {
    return null;
  }

  return (
    <div className="absolute left-0 top-0 z-50 h-dvh w-full  bg-opacity-50 bg-cover bg-fixed bg-center bg-no-repeat backdrop-blur-sm backdrop-filter">
      <div className="relative h-full">
        <div
          ref={ref}
          className="absolute left-2/4 top-2/4 h-[159px] w-[280px] -translate-x-1/2 -translate-y-[150px] transform rounded-lg bg-[#FAFAFA] p-6"
        >
          {modalType === "ConfirmationDeleting" && (
            <ConfirmationDeleting
              chatRoomUuid={chatRoomUuid}
              openModal={openModal}
              lang={lang}
              dict={dict.modal.confirmationDeleting}
            />
          )}
          {modalType === "CompleteDeleting" && (
            <CompleteDeleting>{dict.modal.completeDeleting}</CompleteDeleting>
          )}
        </div>
      </div>
    </div>
  );
}
