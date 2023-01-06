import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TestData } from '@owlprotocol/web3-redux';
import { networkIdArgType } from '../../../test/storybookArgs.js';
import { AssetPickerInstanceSelect, ERC721InstanceSelectWithState } from './AssetPickerModal.js';

// eslint-disable-next-line import/no-default-export
export default {
    title: 'AssetPicker/ERC721InstanceSelect',
    component: AssetPickerInstanceSelect,
} as ComponentMeta<typeof AssetPickerInstanceSelect>;

const Template: ComponentStory<typeof AssetPickerInstanceSelect> = (args: any) => <ERC721InstanceSelect {...args} />;

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

const Template2: ComponentStory<typeof AssetPickerInstanceSelectWithState> = (args: any) => <ERC721InstanceSelectWithState {...args} />;
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
