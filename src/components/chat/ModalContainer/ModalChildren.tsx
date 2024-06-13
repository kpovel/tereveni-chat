import InvitationLink from "./ModalContent/InvitationLink";
import ConfirmationDeleting from "./ModalContent/ConfirmationDeleting";
import CompleteDeleting from "./ModalContent/CompleteDeleting";
import { ModalContentType } from "./ModalContainer";

export default function ModalChilden({
  modalType,
  openModal,
  chatRoomUuid,
  lang,
}: {
  modalType: ModalContentType;
  openModal: (content: ModalContentType) => void;
  chatRoomUuid: string;
  lang: string;
}) {
  switch (modalType) {
    case "InvitationLink":
      return <InvitationLink />;
    case "ConfirmationDeleting":
      return (
        <ConfirmationDeleting
          chatRoomUuid={chatRoomUuid}
          openModal={openModal}
          lang={lang}
        />
      );
    case "CompleteDeleting":
      return <CompleteDeleting />;
    default:
      return null;
  }
}
