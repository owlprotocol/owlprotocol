import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AbiInputAddressArray, AbiInputAddressArrayProps } from '.';

export default {
    title: 'ContractAbi/AbiInput/AddressArray',
    component: AbiInputAddressArray,
} as ComponentMeta<typeof AbiInputAddressArray>;

const Template: ComponentStory<typeof AbiInputAddressArray> = (args: AbiInputAddressArrayProps) => (
    <AbiInputAddressArray {...args} />
);
export const AddressArray = Template.bind({});
AddressArray.args = {
    name: 'targets',
    type: 'address[]',
};
