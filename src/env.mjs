import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    SERVER_URL: z.string().url(),
  },
  client: {
    NEXT_PUBLIC_SERVER_WS_URL: z.string().url(),
  },
  runtimeEnv: {
    SERVER_URL: process.env.SERVER_URL,
    NEXT_PUBLIC_SERVER_WS_URL: process.env.NEXT_PUBLIC_SERVER_WS_URL,
  },
  emptyStringAsUndefined: true,
});
