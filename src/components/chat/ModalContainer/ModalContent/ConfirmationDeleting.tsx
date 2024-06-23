import { useRouter } from "next/navigation";
import { ModalContentType } from "../ModalContainer";
import { deleteChat } from "@/app/[lang]/(protected)/chat/delete/deleteChat";

export default function ConfirmationDeleting({
  openModal,
  chatRoomUuid,
  lang,
  dict,
}: {
  openModal: (content: ModalContentType) => void;
  chatRoomUuid: string;
  lang: string;
  dict: {
    deletePermanently: string;
    deleteForAll: string;
    yes: string;
    no: string;
  };
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
    <div className="flex w-[280px] flex-col items-center gap-5 rounded-lg bg-white p-6">
      <div className="flex flex-col gap-3 text-[#050404]">
        <h4 className="text-base font-semibold">{dict.deletePermanently}</h4>
        <p className="text-xs">{dict.deleteForAll}</p>
      </div>
      <div className="flex w-full justify-end gap-[40px] font-semibold">
        <button onClick={handleDelete} className="text-base text-[#FF453A]">
          {dict.yes}
        </button>
        <button
          onClick={() => openModal(null)}
          className="text-base text-[#050404]"
        >
          {dict.no}
        </button>
      </div>
    </div>
  );
}
