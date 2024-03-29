import { Dispatch, SetStateAction } from "react";
import { DictionaryReturnTypes } from "../../dictionaries";
import { removeCookies } from "./removeCookies";

export function ConfirmLogout({
  dict,
  setOpenConfirmLogout,
  lang,
}: {
  dict: Awaited<DictionaryReturnTypes["/en/account"]>;
  setOpenConfirmLogout: Dispatch<SetStateAction<boolean>>;
  lang: Lang;
}) {
  function closeModal() {
    setOpenConfirmLogout(false);
  }

  function logout() {
    removeCookies(lang);
  }

  return (
    <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center">
      <div className="flex w-[280px] flex-col gap-6 rounded-lg border bg-white p-6 text-base font-semibold">
        <h3 className="text-[#050404]">{dict.dialog.confirmLogout}</h3>
        <div className="flex justify-end gap-10">
          <button className="text-[#FF453A]" onClick={logout}>
            {dict.dialog.yes}
          </button>
          <button className="text-[#050404]" onClick={closeModal}>
            {dict.dialog.no}
          </button>
        </div>
      </div>
    </div>
  );
}
