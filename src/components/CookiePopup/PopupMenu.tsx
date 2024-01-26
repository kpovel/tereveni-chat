import Link from "next/link";

export function PopupMenu({ closePopup }: { closePopup: () => void }) {
  return (
    <div className="absolute bottom-0 left-0 w-full rounded-t-[32px] bg-[#050404] px-10 py-6">
      <p className="text-center text-white">
        This web application uses cookies to ensure you get the best experience
        on our application
      </p>
      {/* todo: update link */}
      <div className="w-full pt-2 text-center">
        <Link href="" className="text-[#7C01F6] underline">
          Learn more
        </Link>
      </div>
      <button
        className="mt-5 w-full rounded-full bg-[#7C01F6] px-6 py-3 text-white"
        onClick={closePopup}
      >
        Got it
      </button>
    </div>
  );
}
