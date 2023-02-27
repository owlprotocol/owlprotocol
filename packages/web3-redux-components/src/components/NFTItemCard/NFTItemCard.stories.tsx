import { ComponentStory, ComponentMeta } from "@storybook/react";
import NFTItemCard from ".";

const Wrapper = (props: any) => {
    return <NFTItemCard {...props} />;
};

export default {
    title: "NFT/NFTItemCard",
    component: NFTItemCard,
} as ComponentMeta<typeof NFTItemCard>;

const Template: ComponentStory<typeof NFTItemCard> = (args: any) => (
    <Wrapper {...args} />
);

export const Breeding = Template.bind({});

Breeding.args = {
    itemName: "Wings Have",
    tokenName: "ERC721",
    generateTime: 600,
    assetPreviewSrc: "http://xxx",
};

export const Asset = Template.bind({});

Asset.args = {
    tokenId: 1,
    value: 0.276,
    itemName: "Wings Have",
    assetPreviewSrc: "http://xxx",
    isSelectable: true,
    isSelected: true,
    onSelect: console.log,
};
