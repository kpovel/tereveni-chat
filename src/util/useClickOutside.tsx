import { useEffect, useRef } from "react";

/**
 * Hook to detect clicks outside of a referenced element.
 *
 * @template T - The type of the referenced element
 *
 * @param callback - The callback function to invoke when a click outside the element is detected
 *
 * @returns The referenced element
 */
export function useClickOutside<T>(callback: () => void) {
  /** The referenced element */
  const ref = useRef<T>(null);

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
