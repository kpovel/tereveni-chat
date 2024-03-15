import { useContext } from "react";

import InvitationLink from "./ModalContent/InvitationLink";
import ConfirmationDeleting from "./ModalContent/ConfirmationDeleting";
import CompleteDeleting from "./ModalContent/CompleteDeleting";
import { ModalContext } from "../../../app/[lang]/(protected)/chat/[chatId]/chatWrapper";
import { ModalContentType } from "./ModalContainer";

export const INVITATION_LINK = "InvitationLink";
export const CONFIRMATION_DELETING = "ConfirmationDeleting";
export const COMPLETE_DELETING = "CompleteDeleting";

export default function ModalChilden({childrenElem, openModal}:{childrenElem: null | string; openModal: (content: ModalContentType) => void;}){

    const { setIsModalOpen } = useContext(ModalContext);

    switch (childrenElem) {
        case "mkmlmlkmnjknjnknjn":
          return <InvitationLink />;
        case CONFIRMATION_DELETING:
          return (
            <ConfirmationDeleting
              openModal={openModal}
              setIsModalOpen={setIsModalOpen}
            />
          );
        case COMPLETE_DELETING:
          return <CompleteDeleting />;
        default:
          return null;
      }
}