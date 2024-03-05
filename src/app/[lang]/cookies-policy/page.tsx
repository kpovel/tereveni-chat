import EnCookiePolicy from "./en.mdx";
import UkCookiePolicy from "./uk.mdx";
import InfoLayout from "../../util/infoLayout";

export default function CookiesPolicy({
  params,
}: {
  params: { lang: "en" | "uk" };
}) {
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