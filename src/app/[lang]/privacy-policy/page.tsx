import { ReactNode } from "react";
import EnPrivacyPolicy from './en.mdx';
import UkPrivacyPolicy from './uk.mdx';

export default async function PrivacyPolicy({
    params,
  }: {
    params: { lang: "uk" | "en" };
  }) {

    if(params.lang === "en") {
        return (
            <InfoLayout>
                <EnPrivacyPolicy />
            </InfoLayout>
        );
    }
  
    return (
        <InfoLayout>
            <UkPrivacyPolicy />
        </InfoLayout>
    );
  }
  
  function InfoLayout({ children }: { children: ReactNode }) {
    return (
      <main className="w-full px-6 pb-10 pt-[40px]">
        <div className="prose mx-auto items-stretch text-white">{children}</div>
      </main>
    );
  }