import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TestData } from "@owlprotocol/web3-redux";
import {
    addressERC721ArgType,
    networkIdArgType,
} from "../../../test/storybookArgs.js";
import ERC721ItemCard from ".";

export default {
    title: "NFT/ERC721ItemCard",
    component: ERC721ItemCard,
} as ComponentMeta<typeof ERC721ItemCard>;

const Template: ComponentStory<typeof ERC721ItemCard> = (args: any) => (
    <ERC721ItemCard {...args} />
);

export const Main = Template.bind({});

Main.args = {
    networkId: networkIdArgType.options[0],
    address: "0x53ea0fa311b556914a58aede8dc5ef69aaa2d7e6",
    tokenId: "1",
};
Main.argTypes = {
    networkId: networkIdArgType,
    // address: addressERC721ArgType,
};
