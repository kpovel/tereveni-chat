"use client";

import { useEffect } from "react";
import { setAccessToken } from "./setToken";

export function SetAccessToken({ accessToken }: { accessToken: string }) {
  useEffect(() => {
    setAccessToken(accessToken);
  }, [accessToken]);

  return <></>;
}
