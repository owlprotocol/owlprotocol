import { BaseCollections } from '@owlprotocol/template-data';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NFTGenerativeItemImageDisplay, NFTGenerativeItemImageDisplayProps } from './NFTGenerativeItemImageDisplay.js';

// eslint-disable-next-line import/no-default-export
export default {
    title: 'NFTGenerativeItem/Image',
    component: NFTGenerativeItemImageDisplay,
} as ComponentMeta<typeof NFTGenerativeItemImageDisplay>;

const Template: ComponentStory<typeof NFTGenerativeItemImageDisplay> = (args: any) => {
    return <NFTGenerativeItemImageDisplay {...args} />;
};

export const Main = Template.bind({});
Main.args = {
    item: Object.values(BaseCollections.shapesItemChoices)[0],
} as NFTGenerativeItemImageDisplayProps;

Main.argTypes = {
    item: {
        options: Object.keys(BaseCollections.shapesItemChoices),
        mapping: BaseCollections.shapesItemChoices,
        control: {
            type: 'select',
        },
    },
};

export const Children = Template.bind({});
Children.args = {
    item: Object.values(BaseCollections.shapesNestedItemChoices)[0],
    showItemChildren: true
} as NFTGenerativeItemImageDisplayProps;

Children.argTypes = {
    item: {
        options: Object.keys(BaseCollections.shapesNestedItemChoices),
        mapping: BaseCollections.shapesNestedItemChoices,
        control: {
            type: 'select',
        },
    },
};
