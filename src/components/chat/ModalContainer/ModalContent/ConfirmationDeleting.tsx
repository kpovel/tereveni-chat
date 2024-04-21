import { useRouter } from "next/navigation";
import { ModalContentType } from "../ModalContainer";
import { deleteChat } from "@/app/[lang]/(protected)/chat/delete/deleteChat";

export default function ConfirmationDeleting({
  openModal,
  chatRoomUuid,
  lang,
}: {
  openModal: (content: ModalContentType) => void;
  chatRoomUuid: string;
  lang: string;
}) {
  const router = useRouter();

  const handleDelete = async () => {
    const deleted = await deleteChat(chatRoomUuid);
    if (deleted) {
      openModal("CompleteDeleting");
      setTimeout(() => {
        openModal(null);
        router.push(`/${lang}/chat/all`);
        router.refresh();
      }, 2000);
    } else {
      openModal(null);
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
          Yes
        </button>
        <button
          onClick={() => openModal(null)}
          className="h-5 w-[26px] bg-none text-base font-semibold text-[#050404]"
        >
          No
        </button>
      </div>
    </div>
  );
}
