import { TrashIcon } from "./TrashIcon";

export function MessageContextList({ openContext }: { openContext: boolean }) {
  function deleteChat() {
    alert("Are you sure you want to delete this chat?");
  }

  return (
    <div className={"relative " + (openContext ? "block" : "hidden")}>
      <button
        onClick={deleteChat}
        className="absolute right-0 top-1 z-10 flex w-[164px] gap-2 rounded-lg
        bg-[#1F1F1F] px-4 py-[15px] shadow-[0px_8px_10px_1px_rgba(0,_0,_0,_0.12)]"
      >
        <TrashIcon />
        Delete chat
      </button>
    </div>
  );
}
