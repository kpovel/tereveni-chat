import EnPrivacyPolicy from './en.mdx';
import UkPrivacyPolicy from './uk.mdx';
import InfoLayout from '../../util/infoLayout';

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