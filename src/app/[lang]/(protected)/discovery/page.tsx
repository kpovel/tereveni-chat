import { handleUnsupportedLang } from "@/util/handleUnsupportedLang";

export default function Discovery({ params }: { params: { lang: Lang } }) {
  handleUnsupportedLang(params.lang);

  return <div>Discovery Page</div>;
}
