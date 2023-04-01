//@ts-nocheck
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TestData } from '@owlprotocol/web3-redux';
import { ERC721GenerativeInstance } from './ERC721GenerativeInstance.js';
import { addressERC721ArgType, networkIdArgType } from '../../test/storybookArgs.js';

// eslint-disable-next-line import/no-default-export
export default {
    title: 'ERC721Generative/ERC721GenerativeInstance',
    component: ERC721GenerativeInstance,
} as ComponentMeta<typeof ERC721GenerativeInstance>;

const Template: ComponentStory<typeof ERC721GenerativeInstance> = (args: any) => <ERC721GenerativeInstance {...args} />;

export const Main = Template.bind({});

Main.args = {
    networkId: '31337',
    address: TestData.SHAPES_NFT,
    tokenId: 1,
    status: 'onchain',
    onSelected: console.debug,
};
Main.argTypes = {
    networkId: networkIdArgType,
    address: addressERC721ArgType,
};
