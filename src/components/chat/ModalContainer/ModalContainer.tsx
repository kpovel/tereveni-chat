import { useClickOutside } from "@/util/useClickOutside";
import ConfirmationDeleting from "./ModalContent/ConfirmationDeleting";
import CompleteDeleting from "./ModalContent/CompleteDeleting";
import { DictionaryReturnTypes } from "@/app/[lang]/dictionaries";
import { LeaveChat } from "./ModalContent/LeaveChat";

export type ModalContentType =
  | "InvitationLink"
  | "ConfirmationDeleting"
  | "CompleteDeleting"
  | "LeaveChat"
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
          {modalType === "LeaveChat" && (
            <div className="absolute left-0 top-0 flex h-dvh w-dvw flex-col items-center justify-center backdrop-blur-[3px]">
              <LeaveChat
                dict={dict.modal.leaveChat}
                lang={lang}
                openModal={openModal}
                chatRoomUuid={chatRoomUuid}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
