import { Collections } from '@owlprotocol/nft-sdk';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
    NFTGenerativeTraitColormapDisplay,
    NFTGenerativeTraitColormapDisplayProps,
} from './NFTGenerativeTraitColormapDisplay.js';

// eslint-disable-next-line import/no-default-export
export default {
    title: 'NFTGenerativeTrait/Colormap',
    component: NFTGenerativeTraitColormapDisplay,
} as ComponentMeta<typeof NFTGenerativeTraitColormapDisplay>;

const Template: ComponentStory<typeof NFTGenerativeTraitColormapDisplay> = (args: any) => {
    return <NFTGenerativeTraitColormapDisplay {...args} />;
};

export const Main = Template.bind({});
Main.args = {
    item: Object.values(Collections.colorItemChoices)[0],
    name: 'colormap',
} as NFTGenerativeTraitColormapDisplayProps;

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
