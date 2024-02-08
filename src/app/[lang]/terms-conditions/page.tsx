import { ReactNode } from "react";
import EnTermsConditions from './en.mdx';
import UkTermsConditions from './uk.mdx';
import InfoLayout from '../../util/infoLayout';

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

