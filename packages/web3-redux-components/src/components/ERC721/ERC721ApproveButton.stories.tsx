import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TestData } from '@owlprotocol/web3-redux';
import { ERC721ApproveButton } from './ERC721ApproveButton.js';
import { addressERC721ArgType, networkIdArgType } from '../../test/storybookArgs.js';

export default {
    title: 'ERC721/ERC721ApproveButton',
    component: ERC721ApproveButton,
} as ComponentMeta<typeof ERC721ApproveButton>;

const MainTemplate: ComponentStory<typeof ERC721ApproveButton> = (args) => (
    <ERC721ApproveButton {...args}>
        <>Approved!</>
    </ERC721ApproveButton>
);
export const Main = MainTemplate.bind({});

Main.args = {
    networkId: '31337',
    address: TestData.SHAPES_NFT_CHILD,
    tokenId: '1',
    approveAddress: TestData.SHAPES_NFT,
    approvalType: 'setApprovalForAll'
};
Main.argTypes = {
    networkId: networkIdArgType,
    address: addressERC721ArgType,
};
