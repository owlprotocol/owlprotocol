import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AbiInputBytes, AbiInputBytesProps } from '.';

export default {
    title: 'ContractAbi/AbiInput/Bytes',
    component: AbiInputBytes,
} as ComponentMeta<typeof AbiInputBytes>;

const Template: ComponentStory<typeof AbiInputBytes> = (args: AbiInputBytesProps) => <AbiInputBytes {...args} />;
export const Bytes = Template.bind({});
Bytes.args = {
    name: 'data',
    type: 'bytes32',
    setValue: (name: string, value: string) => console.debug('Set value', { name, value }),
    setError: (name: string, error: any) => console.debug('Set error', { name, error }),
    clearErrors: (name: any) => console.debug('Clear errors', name),
};
