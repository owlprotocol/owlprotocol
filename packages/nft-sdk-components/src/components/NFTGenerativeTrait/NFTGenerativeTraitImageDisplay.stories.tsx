import { Collections } from '@owlprotocol/nft-sdk';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
    NFTGenerativeTraitImageDisplay,
    NFTGenerativeTraitImageDisplayProps,
} from './NFTGenerativeTraitImageDisplay.js';

// eslint-disable-next-line import/no-default-export
export default {
    title: 'NFTGenerativeTrait/Image',
    component: NFTGenerativeTraitImageDisplay,
} as ComponentMeta<typeof NFTGenerativeTraitImageDisplay>;

const Template: ComponentStory<typeof NFTGenerativeTraitImageDisplay> = (args: any) => {
    return <NFTGenerativeTraitImageDisplay {...args} />;
};

export const Main = Template.bind({});
Main.args = {
    item: Object.values(Collections.shapesItemChoices)[0],
    name: 'imageBg',
} as NFTGenerativeTraitImageDisplayProps;

Main.argTypes = {
    item: {
        options: Object.keys(Collections.shapesItemChoices),
        mapping: Collections.shapesItemChoices,
        control: {
            type: 'select',
        },
    },
    name: {
        defaultValue: 'imageBg',
        options: ['imageBg', 'imageFg'],
        control: {
            type: 'select',
        },
    },
};
