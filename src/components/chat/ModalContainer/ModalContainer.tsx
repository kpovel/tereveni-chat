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
    <div className="absolute left-0 top-0 h-full w-full bg-opacity-50 backdrop-blur-sm">
      <div className="flex h-full items-center justify-center">
        <div ref={ref}>
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
