import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AbiInputBool, AbiInputBoolProps } from '.';

export default {
    title: 'ContractAbi/AbiInput/Bool',
    component: AbiInputBool,
} as ComponentMeta<typeof AbiInputBool>;

const Template: ComponentStory<typeof AbiInputBool> = (args: AbiInputBoolProps) => <AbiInputBool {...args} />;
export const Bool = Template.bind({});
Bool.args = {
    name: 'enable',
    type: 'bool',
    setValue: (name: string, value: string) => console.debug('Set value', { name, value }),
};
