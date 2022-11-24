import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TestData } from "@owlprotocol/web3-redux";
import { ERC721GenerativeImage } from "./ERC721GenerativeImage.js";
import {
    addressERC721ArgType,
    networkIdArgType,
} from "../../test/storybookArgs.js";

// eslint-disable-next-line import/no-default-export
export default {
    title: "ERC721Generative/ERC721GenerativeImage",
    component: ERC721GenerativeImage,
} as ComponentMeta<typeof ERC721GenerativeImage>;

const Template: ComponentStory<typeof ERC721GenerativeImage> = (args: any) => (
    <ERC721GenerativeImage {...args} />
);

export const Main = Template.bind({});

Main.args = {
    networkId: "31337",
    address: TestData.SHAPES_NFT,
    tokenId: 1,
    status: "draft",
};
Main.argTypes = {
    networkId: networkIdArgType,
    address: addressERC721ArgType,
};
