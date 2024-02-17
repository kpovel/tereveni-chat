"use client";

import { useEffect } from "react";
import { setPreferredLang } from "./preferredLang";

export function SetPreferredLanguage({ lang }: { lang: string }) {
  useEffect(() => {
    (async () => {
      if (lang !== "en" && lang !== "uk") {
        await setPreferredLang("en");
        return;
      }

      await setPreferredLang(lang);
    })();
  }, [lang]);

  return <></>;
}
