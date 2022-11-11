import { Collections } from '@owlprotocol/nft-sdk';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
    NFTGenerativeTraitColorDisplay,
    NFTGenerativeTraitColorDisplayProps,
} from './NFTGenerativeTraitColorDisplay.js';

// eslint-disable-next-line import/no-default-export
export default {
    title: 'NFTGenerativeTrait/Color',
    component: NFTGenerativeTraitColorDisplay,
} as ComponentMeta<typeof NFTGenerativeTraitColorDisplay>;

const Template: ComponentStory<typeof NFTGenerativeTraitColorDisplay> = (args: any) => {
    return <NFTGenerativeTraitColorDisplay {...args} />;
};

export const Main = Template.bind({});
Main.args = {
    item: Object.values(Collections.colorItemChoices)[0],
    name: 'bg_color',
} as NFTGenerativeTraitColorDisplayProps;

Main.argTypes = {
    item: {
        options: Object.keys(Collections.colorItemChoices),
        mapping: Collections.colorItemChoices,
        control: {
            type: 'select',
        },
    },
    name: {
        defaultValue: 'bgColor',
        options: ['bgColor'],
        control: {
            type: 'select',
        },
    },
};
