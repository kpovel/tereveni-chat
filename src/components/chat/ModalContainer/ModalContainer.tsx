import ModalChilden from "./ModalChildren";
import { useParams } from 'next/navigation';

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
  lang
}: {
  openModal: (content: ModalContentType) => void;
  childrenElem: ModalContentType;
  elemRef: any;
  chatRoomUuid?: string | null;
  lang?: string
}) {

  // const params = useParams<{ tag: string; item: string }>()
  console.log(`ModalContainer - ${chatRoomUuid}`)
  console.log(`ModalContainer - ${lang}`)

  if (!childrenElem) {
    return null;
  }

  return (
    <div className="absolute left-0 top-[50vh] z-50 h-screen w-full -translate-y-1/2 transform bg-opacity-50 bg-cover bg-fixed bg-center bg-no-repeat backdrop-blur-sm backdrop-filter">
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
