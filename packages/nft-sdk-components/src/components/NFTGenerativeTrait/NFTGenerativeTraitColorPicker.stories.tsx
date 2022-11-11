import { Collections } from '@owlprotocol/nft-sdk';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NFTGenerativeTraitColorPicker, NFTGenerativeTraitColorPickerProps } from './NFTGenerativeTraitColorPicker.js';

// eslint-disable-next-line import/no-default-export
export default {
    title: 'NFTGenerativeTrait/ColorPicker',
    component: NFTGenerativeTraitColorPicker,
} as ComponentMeta<typeof NFTGenerativeTraitColorPicker>;

const Template: ComponentStory<typeof NFTGenerativeTraitColorPicker> = (args: any) => {
    return <NFTGenerativeTraitColorPicker {...args} />;
};

export const Main = Template.bind({});
Main.args = {
    item: Object.values(Collections.colorItemChoices)[0],
    name: 'bgColor',
} as NFTGenerativeTraitColorPickerProps;

Main.argTypes = {
    item: {
        options: Object.keys(Collections.colorItemChoices),
        mapping: Collections.colorItemChoices,
        control: {
            type: 'select',
        },
    },
    name: {
        options: ['bgColor'],
        control: {
            type: 'select',
        },
    },
};
