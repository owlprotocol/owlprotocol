import { Collections } from '@owlprotocol/nft-sdk';
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
    item: Object.values(Collections.shapesItemChoices)[0],
} as NFTGenerativeItemImageDisplayProps;

Main.argTypes = {
    item: {
        options: Object.keys(Collections.shapesItemChoices),
        mapping: Collections.shapesItemChoices,
        control: {
            type: 'select',
        },
    },
};

export const Children = Template.bind({});
Children.args = {
    item: Object.values(Collections.shapesNestedItemChoices)[0],
    showItemChildren: true
} as NFTGenerativeItemImageDisplayProps;

Children.argTypes = {
    item: {
        options: Object.keys(Collections.shapesNestedItemChoices),
        mapping: Collections.shapesNestedItemChoices,
        control: {
            type: 'select',
        },
    },
};
