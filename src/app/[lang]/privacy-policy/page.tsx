import EnPrivacyPolicy from "./en.mdx";
import UkPrivacyPolicy from "./uk.mdx";
import InfoLayout from "../../util/infoLayout";
import { handleUnsupportedLang } from "@/util/handleUnsupportedLang";

export default async function PrivacyPolicy({
  params,
}: {
  params: { lang: "uk" | "en" };
}) {
  handleUnsupportedLang(params.lang);

  if (params.lang === "en") {
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
