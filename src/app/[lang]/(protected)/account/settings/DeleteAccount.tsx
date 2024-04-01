import { DictionaryReturnTypes } from "@/app/[lang]/dictionaries";
import Image from "next/image";
import Trash from "public/account/trash-01.svg";
import { Dispatch, SetStateAction } from "react";
import { DeleteAccountStage } from "./AccountSettings";

export function DeleteAccount({
  dict,
  setDeleteAccountStage,
}: {
  dict: Awaited<DictionaryReturnTypes["/en/account/settings"]>;
  setDeleteAccountStage: Dispatch<SetStateAction<DeleteAccountStage>>;
}) {
  function confirmDeleteAccount() {
    setDeleteAccountStage("ConfirmDeletion");
  }

  return (
    <>
      <button
        className="flex items-center gap-3 rounded-[32px] border border-[#3E205D] p-4"
        onClick={confirmDeleteAccount}
      >
        <Image src={Trash} alt={dict.menu.deleteAccount} />
        {dict.menu.deleteAccount}
      </button>
    </>
  );
}
