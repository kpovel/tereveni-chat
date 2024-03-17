import InvitationLink from "./ModalContent/InvitationLink";
import ConfirmationDeleting from "./ModalContent/ConfirmationDeleting";
import CompleteDeleting from "./ModalContent/CompleteDeleting";
import { ModalContentType } from "./ModalContainer";

export default function ModalChilden({
  childrenElem,
  openModal,
}: {
  childrenElem: ModalContentType;
  openModal: (content: ModalContentType) => void;
}) {
  switch (childrenElem) {
    case "InvitationLink":
      return <InvitationLink />;
    case "ConfirmationDeleting":
      return <ConfirmationDeleting openModal={openModal} />;
    case "CompleteDeleting":
      return <CompleteDeleting />;
    default:
      return null;
  }
}
