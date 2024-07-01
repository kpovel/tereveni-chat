import { useRouter } from "next/navigation";
import { ModalContentType } from "../ModalContainer";
import { leaveChat } from "@/app/[lang]/(protected)/chat/[chatId]/leaveChat";

export function LeaveChat({
  dict,
  openModal,
  chatRoomUuid,
  lang,
}: {
  dict: { areYouSure: string; yes: string; no: string };
  openModal: (content: ModalContentType) => void;
  chatRoomUuid: string;
  lang: string;
}) {
  const router = useRouter();

  async function handleOnLeave() {
    const leaved = await leaveChat(chatRoomUuid);
    if (leaved) {
      openModal(null);
      router.push(`/${lang}/chat/all`);
      router.refresh();
    }
  }

  return (
    <div className="flex w-[280px] flex-col items-center gap-5 rounded-lg bg-white p-6">
      <h4 className="text-base font-semibold text-[#050404]">
        {dict.areYouSure}
      </h4>
      <div className="flex w-full justify-end gap-[40px] font-semibold">
        <button onClick={handleOnLeave} className="text-base text-[#FF453A]">
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
