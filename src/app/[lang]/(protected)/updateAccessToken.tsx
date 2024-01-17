"use client";

import { useEffect } from "react";
import { regenerateAccessToken } from "./regenerateAccessToken";
import { useParams } from "next/navigation";

export function RegenerateAccessToken() {
  const params = useParams<{ lang: "en" | "uk" }>();

  useEffect(() => {
    regenerateAccessToken(params.lang);
  }, [params.lang]);

  return <></>;
}
