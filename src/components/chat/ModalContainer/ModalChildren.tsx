import InvitationLink from "./ModalContent/InvitationLink";
import ConfirmationDeleting from "./ModalContent/ConfirmationDeleting";
import CompleteDeleting from "./ModalContent/CompleteDeleting";
import { ModalContentType } from "./ModalContainer";

export default function ModalChilden({
  childrenElem,
  openModal,
  chatRoomUuid,
  deleteChat
}: {
  childrenElem: ModalContentType;
  openModal: (content: ModalContentType) => void;
  chatRoomUuid?: string | null;
  deleteChat: (chatRoomUuid: string | null ) => void
}) {
  // console.log(chatRoomUuid)
  switch (childrenElem) {
    case "InvitationLink":
      return <InvitationLink />;
    case "ConfirmationDeleting":
      return <ConfirmationDeleting deleteChat={deleteChat} chatRoomUuid={chatRoomUuid} openModal={openModal} />;
    case "CompleteDeleting":
      return <CompleteDeleting />;
    default:
      return null;
  }
}
