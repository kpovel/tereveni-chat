import "server-only";
import { notFound } from "next/navigation";

/**
 * Render not found page if the current language isn't supported
 */
export function handleUnsupportedLang(lang: string) {
  if (lang !== "en" && lang !== "uk") {
    notFound();
  }
}

