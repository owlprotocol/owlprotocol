import { BaseCollections } from '@owlprotocol/template-data';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NFTGenerativeTraitEnumPicker, NFTGenerativeTraitEnumPickerProps } from './NFTGenerativeTraitEnumPicker.js';

// eslint-disable-next-line import/no-default-export
export default {
    title: 'NFTGenerativeTrait/EnumPicker',
    component: NFTGenerativeTraitEnumPicker,
} as ComponentMeta<typeof NFTGenerativeTraitEnumPicker>;

const Template: ComponentStory<typeof NFTGenerativeTraitEnumPicker> = (args: any) => {
    return <NFTGenerativeTraitEnumPicker {...args} />;
};

export const Main = Template.bind({});
Main.args = {
    item: Object.values(BaseCollections.enumItemChoices)[0],
    name: 'faction',
} as NFTGenerativeTraitEnumPickerProps;

Main.argTypes = {
    item: {
        options: Object.keys(BaseCollections.enumItemChoices),
        mapping: BaseCollections.enumItemChoices,
        control: {
            type: 'select',
        },
    },
    name: {
        defaultValue: 'faction',
        options: ['faction'],
        control: {
            type: 'select',
        },
    },
};
