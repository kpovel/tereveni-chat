"use client";

import { useEffect } from "react";
import { setAccessToken } from "./setToken";

export function SetAccessToken({ accessToken }: { accessToken: string }) {
  useEffect(() => {
    setAccessToken(accessToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
}
