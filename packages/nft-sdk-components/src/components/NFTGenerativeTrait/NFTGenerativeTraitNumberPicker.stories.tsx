import { Collections } from '@owlprotocol/nft-sdk';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
    NFTGenerativeTraitNumberPicker,
    NFTGenerativeTraitNumberPickerProps,
} from './NFTGenerativeTraitNumberPicker.js';

// eslint-disable-next-line import/no-default-export
export default {
    title: 'NFTGenerativeTrait/NumberPicker',
    component: NFTGenerativeTraitNumberPicker,
} as ComponentMeta<typeof NFTGenerativeTraitNumberPicker>;

const Template: ComponentStory<typeof NFTGenerativeTraitNumberPicker> = (args: any) => {
    return <NFTGenerativeTraitNumberPicker {...args} />;
};

export const Main = Template.bind({});
Main.args = {
    item: Object.values(Collections.numberItemChoices)[0],
    name: 'strokeWidth',
} as NFTGenerativeTraitNumberPickerProps;

Main.argTypes = {
    item: {
        options: Object.keys(Collections.numberItemChoices),
        mapping: Collections.numberItemChoices,
        control: {
            type: 'select',
        },
    },
    name: {
        options: ['strokeWidth'],
        control: {
            type: 'select',
        },
    },
};
