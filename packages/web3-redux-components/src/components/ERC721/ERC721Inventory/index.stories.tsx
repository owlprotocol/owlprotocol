import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TestData } from "@owlprotocol/web3-redux";
import { networkIdArgType } from "../../../test/storybookArgs.js";
import { ERC721Inventory } from ".";

// eslint-disable-next-line import/no-default-export
export default {
    title: "ERC721/ERC721Equipment/Inventory",
    component: ERC721Inventory,
} as ComponentMeta<typeof ERC721Inventory>;

const Template: ComponentStory<typeof ERC721Inventory> = (args: any) => (
    <ERC721Inventory {...args} />
);

export const Main = Template.bind({});

Main.args = {
    inventoryItems: [
        {
            networkId: "31337",
            address: TestData.SHAPES_NFT,
            tokenId: 1,
            status: "onchain",
        },
        {
            networkId: "31337",
            address: TestData.SHAPES_NFT,
            tokenId: 1,
            status: "onchain",
        },
        {
            networkId: "31337",
            address: TestData.SHAPES_NFT,
            tokenId: 1,
            status: "onchain",
        },
        {
            networkId: "31337",
            address: TestData.SHAPES_NFT,
            tokenId: 1,
            status: "onchain",
        },
        {
            networkId: "31337",
            address: TestData.SHAPES_NFT,
            tokenId: 1,
            status: "onchain",
        },
        {
            networkId: "31337",
            address: TestData.SHAPES_NFT,
            tokenId: 1,
            status: "onchain",
        },
        {
            networkId: "31337",
            address: TestData.SHAPES_NFT,
            tokenId: 1,
            status: "onchain",
        },
        {
            networkId: "31337",
            address: TestData.SHAPES_NFT,
            tokenId: 1,
            status: "onchain",
        },
    ],
};
