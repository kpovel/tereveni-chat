import InvitationLink from "./ModalContent/InvitationLink";
import ConfirmationDeleting from "./ModalContent/ConfirmationDeleting";
import CompleteDeleting from "./ModalContent/CompleteDeleting";
import { ModalContentType } from "./ModalContainer";

export default function ModalChilden({
  childrenElem,
  openModal,
  chatRoomUuid,
  lang
}: {
  childrenElem: ModalContentType;
  openModal: (content: ModalContentType) => void;
  chatRoomUuid?: string | null;
  lang?: string
}) {

  console.log(`ModalChilden - ${chatRoomUuid}, ${lang}`)

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
    case "CompleteDeleting":
      return <CompleteDeleting />;
    default:
      return null;
  }
}
