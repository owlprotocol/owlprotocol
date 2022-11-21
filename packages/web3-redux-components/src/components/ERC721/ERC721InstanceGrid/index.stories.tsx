import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TestData } from "@owlprotocol/web3-redux";
import {
    addressERC721ArgType,
    networkIdArgType,
} from "../../../test/storybookArgs.js";
import { ERC721InstanceGrid } from "./index.js";

// eslint-disable-next-line import/no-default-export
export default {
    title: "ERC721/ERC721InstanceGrid",
    component: ERC721InstanceGrid,
} as ComponentMeta<typeof ERC721InstanceGrid>;

const Template: ComponentStory<typeof ERC721InstanceGrid> = (args: any) => (
    <ERC721InstanceGrid {...args} />
);

export const Main = Template.bind({});

Main.args = {
    tokens: [
        {
            networkId: networkIdArgType.options[0],
            address: TestData.OZ_TEAM,
            tokenId: "1",
        },
        {
            networkId: networkIdArgType.options[0],
            address: TestData.OZ_TEAM,
            tokenId: "2",
        },
        {
            networkId: networkIdArgType.options[0],
            address: TestData.OZ_TEAM,
            tokenId: "1",
        },
        {
            networkId: networkIdArgType.options[0],
            address: TestData.OZ_TEAM,
            tokenId: "2",
        },
        {
            networkId: networkIdArgType.options[0],
            address: TestData.OZ_TEAM,
            tokenId: "1",
        },
        {
            networkId: networkIdArgType.options[0],
            address: TestData.OZ_TEAM,
            tokenId: "2",
        },
        {
            networkId: networkIdArgType.options[0],
            address: TestData.OZ_TEAM,
            tokenId: "1",
        },
        {
            networkId: networkIdArgType.options[0],
            address: TestData.OZ_TEAM,
            tokenId: "2",
        },
    ],
};
