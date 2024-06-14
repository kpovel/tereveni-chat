import { DotsMenu } from "./dotsMenu";
import { DictionaryReturnTypes } from "../../../dictionaries";
import { useClickOutside } from "@/util/useClickOutside";

export function ChatSubMenu({
  searchActiveHandler,
  dict,
  openSubMenu,
  setOpenSubMenu,
}: {
  searchActiveHandler: () => void;
  dict: Awaited<DictionaryReturnTypes["/en/chat"]>;
  openSubMenu: boolean;
  setOpenSubMenu: (open: boolean) => void;
}) {
  const ref = useClickOutside<HTMLButtonElement>(() => setOpenSubMenu(false));
  function toggleMenu() {
    setOpenSubMenu(!openSubMenu);
  }

  return (
    <div className="relative">
      <button
        className="h-8 w-8 hover:bg-[rgba(255,_255,_255,_0.05)]"
        onClick={toggleMenu}
        ref={ref}
      >
        <div className="mx-auto mb-[3px] mt-[3px] h-[3px] w-[3px] rounded-full bg-white"></div>
        <div className="mx-auto mb-[3px] h-[3px] w-[3px] rounded-full bg-white"></div>
        <div className="mx-auto mb-[3px] h-[3px] w-[3px] rounded-full bg-white"></div>
      </button>
      {openSubMenu && (
        <DotsMenu searchActiveHandler={searchActiveHandler} dict={dict} />
      )}
    </div>
  );
}
