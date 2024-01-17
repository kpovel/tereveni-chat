"use client";

import { useEffect } from "react";
import { regenerateAccessToken } from "./regenerateAccessToken";

export function RegenerateAccessToken() {
  useEffect(() => {
      regenerateAccessToken();
  }, []);

  return <></>;
}
