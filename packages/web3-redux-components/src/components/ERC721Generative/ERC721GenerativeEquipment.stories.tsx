import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TestData } from '@owlprotocol/web3-redux';
import { addressERC721ArgType, networkIdArgType } from '../../test/storybookArgs.js';
import { ERC721GenerativeEquipment } from './ERC721GenerativeEquipment.js';

// eslint-disable-next-line import/no-default-export
export default {
    title: 'ERC721Generative/ERC721GenerativeEquipment',
    component: ERC721GenerativeEquipment,
} as ComponentMeta<typeof ERC721GenerativeEquipment>;

const Template: ComponentStory<typeof ERC721GenerativeEquipment> = (args: any) => <ERC721GenerativeEquipment {...args} />;

export const Main = Template.bind({});

Main.args = {
    networkId: '31337',
    address: TestData.SHAPES_NFT,
    tokenId: 1,
};
Main.argTypes = {
    networkId: networkIdArgType,
    address: addressERC721ArgType,
};
