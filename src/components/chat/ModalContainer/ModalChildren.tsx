import InvitationLink from "./ModalContent/InvitationLink";
import ConfirmationDeleting from "./ModalContent/ConfirmationDeleting";
import ConfirmationLeaving from "./ModalContent/ConfirmationLeaving";
import CompleteDeleting from "./ModalContent/CompleteDeleting";
import { ModalContentType } from "./ModalContainer";

export default function ModalChilden({
  childrenElem,
  openModal,
  chatRoomUuid,
  lang,
}: {
  childrenElem: ModalContentType;
  openModal: (content: ModalContentType) => void;
  chatRoomUuid: string;
  lang: string;
}) {

  switch (childrenElem) {
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
    case "ConfirmationLeaving":
      return (
        <ConfirmationLeaving
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
