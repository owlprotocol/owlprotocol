import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TestData } from '@owlprotocol/web3-redux';
import { Artifacts } from '@owlprotocol/contracts';
import type { AbiItem } from 'web3-utils';
import { addressArgType, networkIdArgType } from '../../../test/storybookArgs.js';
import { ContractCallForm } from '.';

export default {
    title: 'ContractAbi/ContractCallForm',
    component: ContractCallForm,
} as ComponentMeta<typeof ContractCallForm>;

const Template: ComponentStory<typeof ContractCallForm> = (args: any) => <ContractCallForm {...args} />;
const address = TestData.USDC;

//eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const totalSupplyAbi = Artifacts.IERC20.abi.find((a: any) => a.name === 'totalSupply')!;
const { name: nameTotalSupply, inputs: inputsTotalSupply } = totalSupplyAbi as AbiItem;
export const TotalSupply = Template.bind({});
TotalSupply.args = {
    networkId: '1',
    address,
    namePrefix: '1. ',
    name: nameTotalSupply,
    inputs: inputsTotalSupply as any,
};
TotalSupply.argTypes = {
    networkId: networkIdArgType,
    address: addressArgType,
};

//eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const balanceOfAbi = Artifacts.IERC20.abi.find((a: any) => a.name === 'balanceOf')!;
const { name: nameBalanceOf, inputs: inputsBalanceOf } = balanceOfAbi as AbiItem;
export const BalanceOf = Template.bind({});
BalanceOf.args = {
    networkId: '1',
    address,
    namePrefix: '1. ',
    name: nameBalanceOf,
    inputs: inputsBalanceOf as any,
};
BalanceOf.argTypes = {
    networkId: networkIdArgType,
    address: addressArgType,
};

export const UndefinedNetwork = Template.bind({});
UndefinedNetwork.args = {
    networkId: undefined,
    address,
    namePrefix: '1. ',
    name: nameTotalSupply,
    inputs: inputsTotalSupply as any,
};

export const NonExistentNetwork = Template.bind({});
NonExistentNetwork.args = {
    networkId: '42',
    address,
    namePrefix: '1. ',
    name: nameTotalSupply,
    inputs: inputsTotalSupply as any,
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
    name: nameTotalSupply,
    inputs: inputsTotalSupply as any,
};
UndefinedContract.argTypes = {
    networkId: networkIdArgType,
};

export const NonExistentContract = Template.bind({});
NonExistentContract.args = {
    networkId: '1',
    address: '0x0',
    namePrefix: '1. ',
    name: nameTotalSupply,
    inputs: inputsTotalSupply as any,
};
NonExistentContract.argTypes = {
    networkId: networkIdArgType,
    address: {
        options: ['0x0'],
        control: { type: 'select' },
    },
};
