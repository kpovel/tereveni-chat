import { ReactNode } from "react";
import { RegenerateAccessToken } from "./updateAccessToken";

export default function Template({ children }: { children: ReactNode }) {
  return <>
    <RegenerateAccessToken />
    {children}
  </>;
}
