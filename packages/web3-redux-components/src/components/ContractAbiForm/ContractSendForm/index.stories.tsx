import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TestData } from '@owlprotocol/web3-redux';
import { Artifacts } from '@owlprotocol/contracts';
import type { AbiItem } from 'web3-utils';
import { addressArgType, networkIdArgType } from '../../../test/storybookArgs.js';
import { ContractSendForm } from '.';

export default {
    title: 'ContractAbi/ContractSendForm',
    component: ContractSendForm,
} as ComponentMeta<typeof ContractSendForm>;

const Template: ComponentStory<typeof ContractSendForm> = (args: any) => <ContractSendForm {...args} />;
const address = TestData.USDC;

//eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const transferAbi = Artifacts.IERC20.abi.find((a: any) => a.name === 'transfer')!;
const { name, inputs } = transferAbi as AbiItem;
export const Transfer = Template.bind({});
Transfer.args = {
    networkId: '1',
    address,
    namePrefix: '1. ',
    name,
    inputs: inputs as any,
};
Transfer.argTypes = {
    networkId: networkIdArgType,
    address: addressArgType,
};

export const UndefinedNetwork = Template.bind({});
UndefinedNetwork.args = {
    networkId: undefined,
    address,
    namePrefix: '1. ',
    name,
    inputs: inputs as any,
};

export const NonExistentNetwork = Template.bind({});
NonExistentNetwork.args = {
    networkId: '42',
    address,
    namePrefix: '1. ',
    name,
    inputs: inputs as any,
};
NonExistentNetwork.argTypes = {
    networkId: networkIdArgType,
    address: addressArgType,
};

export const UndefinedContract = Template.bind({});
UndefinedContract.args = {
    networkId: '1',
    address: undefined,
    namePrefix: '1. ',
    name,
    inputs: inputs as any,
};
UndefinedContract.argTypes = {
    networkId: networkIdArgType,
};

export const NonExistentContract = Template.bind({});
NonExistentContract.args = {
    networkId: '1',
    address: '0x0',
    namePrefix: '1. ',
    name,
    inputs: inputs as any,
};
NonExistentContract.argTypes = {
    networkId: networkIdArgType,
    address: {
        options: ['0x0'],
        control: { type: 'select' },
    },
};
