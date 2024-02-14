import EnCookiePolicy from "./en.mdx";
import UkCookiePolicy from "./uk.mdx";
import InfoLayout from "../../util/infoLayout";
import { handleUnsupportedLang } from "@/util/handleUnsupportedLang";

export default function CookiesPolicy({
  params,
}: {
  params: { lang: "en" | "uk" };
}) {
  handleUnsupportedLang(params.lang);

  if (params.lang === "uk") {
    return (
      <InfoLayout>
        <UkCookiePolicy />
      </InfoLayout>
    );
  }

  return (
    <InfoLayout>
      <EnCookiePolicy />
    </InfoLayout>
  );
}
