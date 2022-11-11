import { Artifacts } from '@owlprotocol/contracts';
import type { AbiItem } from '@owlprotocol/web3-redux/src/utils/web3-utils';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ContractDeployForm, ContractDeployFormProps } from './ContractDeployForm.js';

export default {
    title: 'Contract/DeployForm',
    component: ContractDeployForm,
} as ComponentMeta<typeof ContractDeployForm>;

const Template: ComponentStory<typeof ContractDeployForm> = (args: ContractDeployFormProps) => (
    <ContractDeployForm {...args} />
);

const abi = Artifacts.IERC20.abi as AbiItem[];
const constructorInputs = abi.find((a) => a.type === 'constructor');
const inputs = constructorInputs!.inputs;

export const Main = Template.bind({});
Main.args = {
    inputs,
};
