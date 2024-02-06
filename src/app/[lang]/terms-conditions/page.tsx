import { ReactNode } from "react";
import EnTermsConditions from './en.mdx';
import UkTermsConditions from './uk.mdx';

export default async function TermsConditions({
  params,
}: {
  params: { lang: "uk" | "en" };
}) {

  if(params.lang === "en") {
    return (
        <InfoLayout>
            <EnTermsConditions />
        </InfoLayout>
    );
}

  return (
      <InfoLayout>
        <UkTermsConditions />
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

