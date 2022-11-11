import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TestData } from '@owlprotocol/web3-redux';
import { ERC721GenerativeInstanceGridModal } from './ERC721GenerativeInstanceGridModal.js';

// eslint-disable-next-line import/no-default-export
export default {
    title: 'ERC721Generative/ERC721GenerativeInstanceGridModal',
    component: ERC721GenerativeInstanceGridModal,
} as ComponentMeta<typeof ERC721GenerativeInstanceGridModal>;

const Template: ComponentStory<typeof ERC721GenerativeInstanceGridModal> = (args: any) => (
    <ERC721GenerativeInstanceGridModal {...args} />
);

export const Main = Template.bind({});

Main.args = {
    onClick: console.debug,
    isOpen: true,
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
