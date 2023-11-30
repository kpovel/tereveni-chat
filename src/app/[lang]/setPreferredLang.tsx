"use client";

import { useEffect } from "react";
import { setPreferredLang } from "./preferredLang";

export function SetPreferredLanguage({ lang }: { lang: string }) {
  useEffect(() => {
    (async () => {
      await setPreferredLang(lang);
    })();
  }, [lang]);

  return <></>;
}

