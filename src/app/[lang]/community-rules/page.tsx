import EnCommunityRules from "./en.mdx";
import UkCommunityRules from "./uk.mdx";
import InfoLayout from "../../util/infoLayout";
import { handleUnsupportedLang } from "@/util/handleUnsupportedLang";

export default async function CommunityRules({
  params,
}: {
  params: { lang: "uk" | "en" };
}) {
  handleUnsupportedLang(params.lang);

  if (params.lang === "en") {
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
