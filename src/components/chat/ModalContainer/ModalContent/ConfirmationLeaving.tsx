import { useRouter } from "next/navigation";
import { ModalContentType } from "../ModalContainer";
import { leaveChat } from "@/app/[lang]/(protected)/chat/leave/leaveChat";

export default function ConfirmationLeaving({
  openModal,
  chatRoomUuid,
  lang,
}: {
  openModal: (content: ModalContentType) => void;
  chatRoomUuid: string;
  lang: string;
}) {
  const router = useRouter();

  const handleLeave = async () => {
    const leave = await leaveChat(chatRoomUuid);
    if (leave) {
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
        Are you sure you want to leave this chat?
      </h4>
      <div className="mt-6 flex w-full justify-end">
        <button
          onClick={handleLeave}
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
