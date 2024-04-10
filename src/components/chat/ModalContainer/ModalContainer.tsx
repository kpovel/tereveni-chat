import ModalChilden from "./ModalChildren";

export type ModalContentType =
  | "InvitationLink"
  | "ConfirmationDeleting"
  | "CompleteDeleting"
  | null;

export default function ModalContainer({
  openModal,
  childrenElem,
  elemRef,
  chatRoomUuid,
  lang,
}: {
  openModal: (content: ModalContentType) => void;
  childrenElem: ModalContentType;
  elemRef: any;
  chatRoomUuid: string;
  lang: string;
}) {
  if (!childrenElem) {
    return null;
  }

  return (
    <div className="absolute left-0 top-0 z-50 h-dvh w-full  bg-opacity-50 bg-cover bg-fixed bg-center bg-no-repeat backdrop-blur-sm backdrop-filter">
      <div className="relative h-full">
        <div
          ref={elemRef}
          className="absolute left-2/4 top-2/4 h-[159px] w-[280px] -translate-x-1/2 -translate-y-[150px] transform rounded-lg bg-[#FAFAFA] p-6"
        >
          <ModalChilden
            chatRoomUuid={chatRoomUuid}
            childrenElem={childrenElem}
            openModal={openModal}
            lang={lang}
          />
        </div>
      </div>
    </div>
  );
}
