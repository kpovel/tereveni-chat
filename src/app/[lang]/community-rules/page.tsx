import { ReactNode } from "react";
import EnCommunityRules from './en.mdx';
import UkCommunityRules from './uk.mdx';

export default async function CommunityRules({
    params,
}:{
    params: { lang: "uk" | "en"};
}) {

    if(params.lang === "en") {
        return (
            <InfoLayout>
                <EnCommunityRules />
            </InfoLayout>
        );
    }
  
    return (
        <InfoLayout>
            <UkCommunityRules />
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