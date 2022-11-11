import { Collections } from '@owlprotocol/nft-sdk';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
    NFTGenerativeTraitColormapPicker,
    NFTGenerativeTraitColormapPickerProps,
} from './NFTGenerativeTraitColormapPicker.js';

// eslint-disable-next-line import/no-default-export
export default {
    title: 'NFTGenerativeTrait/ColormapPicker',
    component: NFTGenerativeTraitColormapPicker,
} as ComponentMeta<typeof NFTGenerativeTraitColormapPicker>;

const Template: ComponentStory<typeof NFTGenerativeTraitColormapPicker> = (args: any) => {
    return <NFTGenerativeTraitColormapPicker {...args} />;
};

export const Main = Template.bind({});
Main.args = {
    item: Object.values(Collections.colormapItemChoices)[0],
    name: 'colormap',
} as NFTGenerativeTraitColormapPickerProps;

Main.argTypes = {
    item: {
        options: Object.keys(Collections.colormapItemChoices),
        mapping: Collections.colormapItemChoices,
        control: {
            type: 'select',
        },
    },
    name: {
        defaultValue: 'colormap',
        options: ['colormap'],
        control: {
            type: 'select',
        },
    },
};
