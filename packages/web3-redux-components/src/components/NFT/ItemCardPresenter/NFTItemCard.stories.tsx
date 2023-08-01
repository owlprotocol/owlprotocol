import { ComponentStory, ComponentMeta } from "@storybook/react";
import { NFTItemCardPresenter } from "./index";

const Wrapper = (props: any) => {
    return <NFTItemCardPresenter {...props} />;
};

export default {
    title: "NFT/NFTItemCardPresenter",
    component: NFTItemCardPresenter,
} as ComponentMeta<typeof NFTItemCardPresenter>;

const Template: ComponentStory<typeof NFTItemCardPresenter> = (args: any) => (
    <Wrapper {...args} />
);

export const Main = Template.bind({});

Main.args = {
    tokenId: 1,
    value: 0.276,
    itemName: "Wings Have",
    assetPreviewSrc:
        "https://i.seadn.io/s/production/6f1ae284-c061-4f87-aecb-e08c9a443cfe.png",
    isSelected: true,
    onSelect: console.log,
};
