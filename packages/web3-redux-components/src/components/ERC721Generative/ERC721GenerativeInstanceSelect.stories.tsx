import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TestData } from '@owlprotocol/web3-redux';
import {
    ERC721GenerativeInstanceSelect,
    ERC721GenerativeInstanceSelectWithState,
} from './ERC721GenerativeInstanceSelect.js';

// eslint-disable-next-line import/no-default-export
export default {
    title: 'ERC721Generative/ERC721GenerativeInstanceSelect',
    component: ERC721GenerativeInstanceSelect,
} as ComponentMeta<typeof ERC721GenerativeInstanceSelect>;

const Template: ComponentStory<typeof ERC721GenerativeInstanceSelect> = (args: any) => (
    <ERC721GenerativeInstanceSelect {...args} />
);

export const Choices = Template.bind({});

Choices.args = {
    onSelect: console.debug,
    setSelecting: console.debug,
    selecting: true,
    tokens: [
        {
            networkId: '31337',
            address: TestData.SHAPES_NFT,
            tokenId: 1,
            status: 'onchain',
        },
        /*
        {
            networkId: '31337',
            address: TestData.SHAPES_NFT_CHILD,
            tokenId: 1,
        }
        */
    ],
};

export const Selected = Template.bind({});

Selected.args = {
    onSelect: console.debug,
    setSelecting: console.debug,
    selecting: false,
    token: {
        networkId: '31337',
        address: TestData.SHAPES_NFT,
        tokenId: 1,
        status: 'onchain',
    },
    tokens: [],
};

const Template2: ComponentStory<typeof ERC721GenerativeInstanceSelectWithState> = (args: any) => (
    <ERC721GenerativeInstanceSelectWithState {...args} />
);
export const Stateful = Template2.bind({});

Stateful.args = {
    tokens: [
        {
            networkId: '31337',
            address: TestData.SHAPES_NFT,
            tokenId: 1,
            status: 'onchain',
        },
        /*
        {
            networkId: '31337',
            address: TestData.SHAPES_NFT_CHILD,
            tokenId: 1,
        }
        */
    ],
};
