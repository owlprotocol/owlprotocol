import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AbiInputNumber, AbiInputNumberProps } from '.';

export default {
    title: 'ContractAbi/AbiInput/Number',
    component: AbiInputNumber,
} as ComponentMeta<typeof AbiInputNumber>;

const Template: ComponentStory<typeof AbiInputNumber> = (args: AbiInputNumberProps) => <AbiInputNumber {...args} />;
export const Number = Template.bind({});
Number.args = {
    name: 'amount',
    type: 'uint256',
    setValue: (name: string, value: string) => console.debug('Set value', { name, value }),
};
