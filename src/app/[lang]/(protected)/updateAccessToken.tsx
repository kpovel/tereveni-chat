"use client";

import { useEffect } from "react";
import { regenerateAccessToken } from "./regenerateAccessToken";

export function RegenerateAccessToken() {
  console.log("runned");

  useEffect(() => {
      regenerateAccessToken();
  }, []);

  return <></>;
}
