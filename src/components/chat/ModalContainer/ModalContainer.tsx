import { useContext } from "react";

import InvitationLink from "./ModalContent/InvitationLink";
import ConfirmationDeleting from "./ModalContent/ConfirmationDeleting";
import CompleteDeleting from "./ModalContent/CompleteDeleting";

import { ModalContext } from "../../../app/[lang]/(protected)/chat/[chatId]/chatWrapper";

export default function ModalContainer({
  openModal,
  childrenElem,
  elemRef,
}: {
  openModal: (content: null | string) => void;
  childrenElem: null | string;
  elemRef: any;
}) {

  const { isModalOpen, setIsModalOpen } = useContext(ModalContext);

  const modalChildren = () => {
    switch (childrenElem) {
      case "InvitationLink":
        return <InvitationLink />;
      case "ConfirmationDeleting":
        return (
          <ConfirmationDeleting
            openModal={openModal}
            setIsModalOpen={setIsModalOpen}
          />
        );
      case "CompleteDeleting":
        return <CompleteDeleting />;
      default:
        return null;
    }
  };

  return (
    <div className="absolute z-10 h-full w-full bg-opacity-50 bg-cover bg-fixed bg-center bg-no-repeat backdrop-blur-sm backdrop-filter">
      <div className="relative h-full">
        <div
          ref={elemRef}
          className="absolute rounded-lg left-2/4 top-2/4 h-[159px] w-[280px] -translate-x-[50%] -translate-y-[50%] bg-[#FAFAFA] p-6"
        >
          {modalChildren()}
        </div>
      </div>
    </div>
  );
}
