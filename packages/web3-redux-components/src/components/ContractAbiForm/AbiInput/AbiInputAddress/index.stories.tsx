import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AbiInputAddress, AbiInputAddressProps } from '.';

export default {
    title: 'ContractAbi/AbiInput/Address',
    component: AbiInputAddress,
} as ComponentMeta<typeof AbiInputAddress>;

const Template: ComponentStory<typeof AbiInputAddress> = (args: AbiInputAddressProps) => <AbiInputAddress {...args} />;
export const Address = Template.bind({});
Address.args = {
    name: 'from',
    type: 'address',
    setValue: (name: string, value: string) => console.debug('Set value', { name, value }),
    setError: (name: string, error: any) => console.debug('Set error', { name, error }),
    clearErrors: (name: any) => console.debug('Clear errors', name),
};
