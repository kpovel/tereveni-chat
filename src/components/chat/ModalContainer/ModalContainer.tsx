import ModalChilden from "./ModalChildren";
// import { deleteChat } from "@/app/[lang]/(protected)/chat/delete/deleteChat"

export type ModalContentType =
  | "InvitationLink"
  | "ConfirmationDeleting"
  | "CompleteDeleting"
  | null;

export default function ModalContainer({
  deleteChat,
  openModal,
  childrenElem,
  elemRef,
  chatRoomUuid,
}: {
  deleteChat: (chatRoomUuid: string | null) => void
  openModal: (content: ModalContentType) => void;
  childrenElem: ModalContentType;
  elemRef: any;
  chatRoomUuid?: string | null;
}) {
  
  if (!childrenElem) {
    return null;
  }

  // console.log(`ModalContainer - ${chatRoomUuid}`)

  return (
    <div className="absolute left-0 z-10 h-full w-full bg-opacity-50 bg-cover bg-fixed bg-center bg-no-repeat backdrop-blur-sm backdrop-filter">
      <div className="relative h-full">
        <div
          ref={elemRef}
          className="absolute left-2/4 top-2/4 h-[159px] w-[280px] -translate-x-[50%] -translate-y-[50%] rounded-lg bg-[#FAFAFA] p-6"
        >
          <ModalChilden deleteChat={deleteChat} chatRoomUuid={chatRoomUuid} childrenElem={childrenElem} openModal={openModal} />
        </div>
      </div>
    </div>
  );
}
