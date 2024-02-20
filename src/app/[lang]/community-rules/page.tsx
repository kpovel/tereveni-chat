import EnCommunityRules from './en.mdx';
import UkCommunityRules from './uk.mdx';
import InfoLayout from "../../util/infoLayout";

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