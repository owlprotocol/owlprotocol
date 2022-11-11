import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TestData } from '@owlprotocol/web3-redux';
import { networkIdArgType } from '../../../test/storybookArgs.js';
import { ERC721InstanceGridModal } from './index.js';

// eslint-disable-next-line import/no-default-export
export default {
    title: 'ERC721/ERC721InstanceGridModal',
    component: ERC721InstanceGridModal,
} as ComponentMeta<typeof ERC721InstanceGridModal>;

const Template: ComponentStory<typeof ERC721InstanceGridModal> = (args: any) => <ERC721InstanceGridModal {...args} />;

export const Main = Template.bind({});

Main.args = {
    isOpen: true,
    tokens: [
        {
            networkId: networkIdArgType.options[0],
            address: TestData.OZ_TEAM,
            tokenId: '1',
        },
        {
            networkId: networkIdArgType.options[0],
            address: TestData.OZ_TEAM,
            tokenId: '2',
        }
    ]

};
