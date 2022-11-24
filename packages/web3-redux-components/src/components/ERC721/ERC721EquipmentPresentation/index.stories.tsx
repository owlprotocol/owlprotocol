import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Collections } from "@owlprotocol/nft-sdk";
import { TestData } from "@owlprotocol/web3-redux";
import { networkIdArgType } from "../../../test/storybookArgs.js";
import ERC721EquipmentPresentation from ".";

// eslint-disable-next-line import/no-default-export
export default {
    title: "ERC721Generative/ERC721EquipmentPresentation",
    component: ERC721EquipmentPresentation,
} as ComponentMeta<typeof ERC721EquipmentPresentation>;

const Template: ComponentStory<typeof ERC721EquipmentPresentation> = (
    args: any
) => <ERC721EquipmentPresentation {...args} />;

export const Main = Template.bind({});

Main.args = {
    item: Object.values(Collections.shapesItemChoices)[0],
    itemName: "OWL #1",
    tokens: [
        {
            networkId: "31337",
            address: TestData.SHAPES_NFT,
            tokenId: 1,
        },
        {
            networkId: "31337",
            address: TestData.SHAPES_NFT,
            tokenId: 1,
        },
        {
            networkId: "31337",
            address: TestData.SHAPES_NFT,
            tokenId: 1,
        },
        {
            networkId: "31337",
            address: TestData.SHAPES_NFT,
            tokenId: 1,
        },
        {
            networkId: "31337",
            address: TestData.SHAPES_NFT,
            tokenId: 1,
        },
        {
            networkId: "31337",
            address: TestData.SHAPES_NFT,
            tokenId: 1,
        },
        {
            networkId: "31337",
            address: TestData.SHAPES_NFT,
            tokenId: 1,
        },
        {
            networkId: "31337",
            address: TestData.SHAPES_NFT,
            tokenId: 1,
        },
    ],
    inventoryItems: [
        {
            networkId: "31337",
            address: TestData.SHAPES_NFT,
            tokenId: 1,
        },
        {
            networkId: "31337",
            address: TestData.SHAPES_NFT,
            tokenId: 1,
        },
        {
            networkId: "31337",
            address: TestData.SHAPES_NFT,
            tokenId: 1,
        },
        {
            networkId: "31337",
            address: TestData.SHAPES_NFT,
            tokenId: 1,
        },
        {
            networkId: "31337",
            address: TestData.SHAPES_NFT,
            tokenId: 1,
        },
        {
            networkId: "31337",
            address: TestData.SHAPES_NFT,
            tokenId: 1,
        },
        {
            networkId: "31337",
            address: TestData.SHAPES_NFT,
            tokenId: 1,
        },
        {
            networkId: "31337",
            address: TestData.SHAPES_NFT,
            tokenId: 1,
        },
        {
            networkId: "31337",
            address: TestData.SHAPES_NFT,
            tokenId: 1,
        },
        {
            networkId: "31337",
            address: TestData.SHAPES_NFT,
            tokenId: 1,
        },
        {
            networkId: "31337",
            address: TestData.SHAPES_NFT,
            tokenId: 1,
        },
        {
            networkId: "31337",
            address: TestData.SHAPES_NFT,
            tokenId: 1,
        },
    ],
};
