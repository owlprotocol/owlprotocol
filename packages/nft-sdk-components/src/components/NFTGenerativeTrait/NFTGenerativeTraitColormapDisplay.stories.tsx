import { BaseCollections } from '@owlprotocol/template-data';
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
    item: Object.values(BaseCollections.colorItemChoices)[0],
    name: 'colormap',
} as NFTGenerativeTraitColormapDisplayProps;

Main.argTypes = {
    item: {
        options: Object.keys(BaseCollections.colormapItemChoices),
        mapping: BaseCollections.colormapItemChoices,
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
