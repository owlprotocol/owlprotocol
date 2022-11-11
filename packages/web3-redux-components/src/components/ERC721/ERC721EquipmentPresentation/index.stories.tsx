import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Collections } from '@owlprotocol/nft-sdk';
import { TestData } from '@owlprotocol/web3-redux';
import { networkIdArgType } from '../../../test/storybookArgs.js';
import ERC721EquipmentPresentation from '.';

// eslint-disable-next-line import/no-default-export
export default {
    title: 'ERC721Generative/ERC721EquipmentPresentation',
    component: ERC721EquipmentPresentation,
} as ComponentMeta<typeof ERC721EquipmentPresentation>;

const Template: ComponentStory<typeof ERC721EquipmentPresentation> = (args: any) => (
    <ERC721EquipmentPresentation {...args} />
);

export const Main = Template.bind({});

Main.args = {
    item: Object.values(Collections.shapesItemChoices)[0],
    itemName: 'OWL #1',
    tokens: [
        {
            networkId: networkIdArgType.options[0],
            address: TestData.POTATOZ,
            tokenId: '1',
        },
        {
            networkId: networkIdArgType.options[0],
            address: TestData.OZ_TEAM,
            tokenId: '2',
        },
        {
            networkId: networkIdArgType.options[0],
            address: TestData.POTATOZ,
            tokenId: '1',
        },
        {
            networkId: networkIdArgType.options[0],
            address: TestData.OZ_TEAM,
            tokenId: '2',
        },
    ],
    inventoryItems: [
        {
            networkId: networkIdArgType.options[0],
            address: TestData.OZ_TEAM,
            tokenId: '1',
        },
        {
            networkId: networkIdArgType.options[0],
            address: TestData.OZ_TEAM,
            tokenId: '2',
        },
        {
            networkId: networkIdArgType.options[0],
            address: TestData.OZ_TEAM,
            tokenId: '1',
        },
        {
            networkId: networkIdArgType.options[0],
            address: TestData.OZ_TEAM,
            tokenId: '2',
        },
        {
            networkId: networkIdArgType.options[0],
            address: TestData.OZ_TEAM,
            tokenId: '1',
        },
        {
            networkId: networkIdArgType.options[0],
            address: TestData.OZ_TEAM,
            tokenId: '2',
        },
    ],
};
