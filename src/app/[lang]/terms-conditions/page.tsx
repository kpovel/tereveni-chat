import EnTermsConditions from "./en.mdx";
import UkTermsConditions from "./uk.mdx";
import InfoLayout from "../../util/infoLayout";
import { handleUnsupportedLang } from "@/util/handleUnsupportedLang";

export default async function TermsConditions({
  params,
}: {
  params: { lang: "uk" | "en" };
}) {
  handleUnsupportedLang(params.lang);

  if (params.lang === "en") {
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
