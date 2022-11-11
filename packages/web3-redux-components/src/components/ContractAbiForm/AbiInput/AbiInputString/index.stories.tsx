import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AbiInputString, AbiInputStringProps } from '.';

export default {
    title: 'ContractAbi/AbiInput/String',
    component: AbiInputString,
} as ComponentMeta<typeof AbiInputString>;

const Template: ComponentStory<typeof AbiInputString> = (args: AbiInputStringProps) => <AbiInputString {...args} />;
export const String = Template.bind({});
String.args = {
    name: 'from',
    type: 'string',
    setValue: (name: string, value: string) => console.debug('Set value', { name, value }),
};
