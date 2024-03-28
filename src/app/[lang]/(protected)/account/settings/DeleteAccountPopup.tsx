import { Dispatch, SetStateAction } from "react";
import { DeleteAccountStage } from "./AccountSettings";
import { DictionaryReturnTypes } from "@/app/[lang]/dictionaries";
import { deleteUserAccount } from "./deleteUserAccount";
import Done from "public/done_icon.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function DeleteAccountPopup({
  deleteAccountStage,
  setDeleteAccountStage,
  dict,
  lang,
}: {
  deleteAccountStage: DeleteAccountStage;
  setDeleteAccountStage: Dispatch<SetStateAction<DeleteAccountStage>>;
  dict: Awaited<DictionaryReturnTypes["/en/account/settings"]>;
  lang: Lang;
}) {
  if (!deleteAccountStage) {
    return null;
  }

  return (
    <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center text-[#050404]">
      {deleteAccountStage === "ConfirmDeletion" && (
        <ConfirmDeletionStage
          setDeleteAccountStage={setDeleteAccountStage}
          dict={dict}
          lang={lang}
        />
      )}
      {deleteAccountStage === "AccountDeleted" && (
        <AccountDeletedStage dict={dict} />
      )}
    </div>
  );
}

function ConfirmDeletionStage({
  setDeleteAccountStage,
  dict,
  lang,
}: {
  setDeleteAccountStage: Dispatch<SetStateAction<DeleteAccountStage>>;
  dict: Awaited<DictionaryReturnTypes["/en/account/settings"]>;
  lang: Lang;
}) {
  const router = useRouter();

  function closeModal() {
    setDeleteAccountStage(null);
  }

  async function deleteAccount() {
    const isDeletedAccount = await deleteUserAccount();

    if (isDeletedAccount) {
      setDeleteAccountStage("AccountDeleted");

      setTimeout(() => {
        router.push(`/${lang}`);
      }, 2000);

      return;
    }

    setDeleteAccountStage(null);
  }

  return (
    <div className="flex w-[280px] flex-col gap-10 rounded-lg bg-white p-6">
      <div className="flex flex-col gap-3">
        <h2 className="text-base font-semibold">{dict.popup.deleteAccount}</h2>
        <p className="text-xs">{dict.popup.deleteAccountDescription}</p>
      </div>
      <div className="flex justify-end gap-10 text-base font-semibold">
        <button className="text-[#FF453A]" onClick={deleteAccount}>
          {dict.popup.delete}
        </button>
        <button className="text-[#050404]" onClick={closeModal}>
          {dict.popup.cancel}
        </button>
      </div>
    </div>
  );
}

function AccountDeletedStage({
  dict,
}: {
  dict: Awaited<DictionaryReturnTypes["/en/account/settings"]>;
}) {
  return (
    <div className="flex w-[280px] flex-col items-center gap-5 rounded-lg bg-white px-6 py-[35px]">
      <Image src={Done} alt="Done" />
      <h2 className="text-center text-base font-semibold">
        {dict.popup.accountDeleted}
      </h2>
    </div>
  );
}
