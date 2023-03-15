import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CollectionCardPresenter, CollectionCardProps } from ".";

const Wrapper = (props: CollectionCardProps) => {
    return <CollectionCardPresenter {...props} />;
};

export default {
    title: "NFT/Explore/CollectionCard",
    component: CollectionCardPresenter,
} as ComponentMeta<typeof CollectionCardPresenter>;

const Template: ComponentStory<typeof CollectionCardPresenter> = (
    args: CollectionCardProps
) => <Wrapper {...args} />;

export const Main = Template.bind({});

Main.args = {
    networkId: 1,
    title: "SeFi land seeds",
    isVerified: true,
    description:
        "Lonsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    recipeNumber: 34,
    floorPrice: 40,
    volume: 617,
    assetAvatarSrc:
        "https://i.seadn.io/gcs/files/f43f8b05060b60e22ead8593591796f1.jpg?auto=format&w=500&h=500&fr=1",
    assetPreviewSrc:
        "https://static01.nyt.com/images/2021/02/27/arts/24beeple-2/merlin_184196679_acecafff-affa-490c-b202-348d20c9c1b2-mobileMasterAt3x.jpg",
};
