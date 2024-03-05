export default function OnlineStatus({ isOnline }: { isOnline: boolean }) {
  return (
    <div className="flex items-center">
      <div
        className={`h-2 w-2 rounded-full border ${
          isOnline
            ? "border-green-900 bg-green-500"
            : "border-stone-900 bg-zinc-500"
        }`}
      ></div>
      <span
        className={`ml-[5px] text-center text-xs font-normal ${
          isOnline ? "text-green-500" : "text-zinc-500"
        }`}
      >
        {isOnline ? "Online" : "Offline"}
      </span>
    </div>
  );
}
