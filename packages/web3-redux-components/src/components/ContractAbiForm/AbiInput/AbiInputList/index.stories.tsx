import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { AbiInputList } from '.';

export default {
    title: 'ContractAbi/AbiInput/List',
    component: AbiInputList,
} as ComponentMeta<typeof AbiInputList>;

const Template: ComponentStory<typeof AbiInputList> = (args: any) => {
    const { setValue, setError, clearErrors, getFieldState, formState } = useForm();

    return <AbiInputList {...args} {...{ setValue, setError, clearErrors, getFieldState, formState }} />;
};

export const List = Template.bind({});
List.args = {
    inputs: [
        { name: 'from', type: 'address' },
        { name: 'targets', type: 'address[]' },
        { name: 'amount', type: 'uint8' },
        { name: 'enable', type: 'bool' },
        { name: 'symbol', type: 'string' },
    ],
};
