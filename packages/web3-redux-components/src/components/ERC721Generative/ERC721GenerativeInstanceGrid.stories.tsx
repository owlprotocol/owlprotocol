import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TestData } from '@owlprotocol/web3-redux';
import { ERC721GenerativeInstanceGrid } from './ERC721GenerativeInstanceGrid.js';

// eslint-disable-next-line import/no-default-export
export default {
    title: 'ERC721Generative/ERC721GenerativeInstanceGrid',
    component: ERC721GenerativeInstanceGrid,
} as ComponentMeta<typeof ERC721GenerativeInstanceGrid>;

const Template: ComponentStory<typeof ERC721GenerativeInstanceGrid> = (args: any) => (
    <ERC721GenerativeInstanceGrid {...args} />
);

export const Main = Template.bind({});

Main.args = {
    onClick: console.debug,
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
