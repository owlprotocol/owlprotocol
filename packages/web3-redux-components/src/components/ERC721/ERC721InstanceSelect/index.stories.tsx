import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TestData } from '@owlprotocol/web3-redux';
import { networkIdArgType } from '../../../test/storybookArgs.js';
import { ERC721InstanceSelect, ERC721InstanceSelectWithState } from './index.js';

// eslint-disable-next-line import/no-default-export
export default {
    title: 'ERC721/ERC721InstanceSelect',
    component: ERC721InstanceSelect,
} as ComponentMeta<typeof ERC721InstanceSelect>;

const Template: ComponentStory<typeof ERC721InstanceSelect> = (args: any) => <ERC721InstanceSelect {...args} />;

export const Choices = Template.bind({});

Choices.args = {
    selecting: true,
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

export const Selected = Template.bind({});

Selected.args = {
    selecting: false,
    token: {
        networkId: networkIdArgType.options[0],
        address: TestData.OZ_TEAM,
        tokenId: '1',
    },
    tokens: []
};

const Template2: ComponentStory<typeof ERC721InstanceSelectWithState> = (args: any) => <ERC721InstanceSelectWithState {...args} />;
export const Stateful = Template2.bind({});

Stateful.args = {
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
