import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TestData } from '@owlprotocol/web3-redux';
import { Artifacts } from '@owlprotocol/contracts';
import { addressArgType, networkIdArgType } from '../../../test/storybookArgs.js';
import { ContractDeployForm } from '.';

export default {
    title: 'ContractAbi/ContractDeployForm',
    component: ContractDeployForm,
} as ComponentMeta<typeof ContractDeployForm>;

const Template: ComponentStory<typeof ContractDeployForm> = (args: any) => <ContractDeployForm {...args} />;
const address = TestData.USDC;

//eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const { abi, bytecode } = Artifacts.IERC20.abi;
export const ERC20 = Template.bind({});
ERC20.args = {
    networkId: '1',
    abi,
    bytecode,
};
ERC20.argTypes = {
    networkId: networkIdArgType,
};
