import { BaseCollections } from '@owlprotocol/template-data';
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
    item: Object.values(BaseCollections.shapesItemChoices)[0],
    name: 'imageBg',
} as NFTGenerativeTraitImageDisplayProps;

Main.argTypes = {
    item: {
        options: Object.keys(BaseCollections.shapesItemChoices),
        mapping: BaseCollections.shapesItemChoices,
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
