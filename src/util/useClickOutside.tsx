import { useEffect, useRef } from "react";

export function useClickOutside(callback: () => void) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !(ref.current as any).contains(event.target)) {
        callback();
      }
    }

    function handlePressEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        callback();
      }
    }

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handlePressEscape);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handlePressEscape);
    };
  }, [callback, ref]);

  return ref;
}
