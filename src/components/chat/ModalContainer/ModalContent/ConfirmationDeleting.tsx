import { ModalContentType } from "../ModalContainer";
import { deleteChat } from "@/app/[lang]/(protected)/chat/delete/deleteChat"


export default function ConfirmationDeleting({
  // deleteChat,
  openModal,
  chatRoomUuid
}: {
  // deleteChat: (chatRoomUuid: string | null) => boolean
  openModal: (content: ModalContentType) => void;
  chatRoomUuid?: string | null 
}) {
// console.log(chatRoomUuid)

const handleDelete = () => {
  if (chatRoomUuid) {
    deleteChat(chatRoomUuid);
    openModal("CompleteDeleting");
  }
};

  return (
    <div>
      <h4 className="mb-3 text-base font-semibold text-[#050404]">
        Are you sure you want to permanently delete this chat?
      </h4>
      <p className="text-xs font-normal text-[#050404]">
        The chat will be deleted for you only
      </p>
      <div className="mt-6 flex w-full justify-end">
        <button
          onClick={handleDelete}
          className="mr-10 h-5 w-[26px] bg-none text-base font-semibold text-[#FF453A]"
        >
          yes
        </button>
        <button
          onClick={() => openModal(null)}
          className="h-5 w-[26px] bg-none text-base font-semibold text-[#050404]"
        >
          no
        </button>
      </div>
    </div>
  );
}
