import { Collections } from '@owlprotocol/nft-sdk';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
    NFTGenerativeItemPicker,
    NFTGenerativeItemPickerWithState,
    NFTGenerativeItemPickerProps,
} from './NFTGenerativeItemPicker.js';

// eslint-disable-next-line import/no-default-export
export default {
    title: 'NFTGenerativeItem/Picker',
    component: NFTGenerativeItemPicker,
} as ComponentMeta<typeof NFTGenerativeItemPicker>;

const Template: ComponentStory<typeof NFTGenerativeItemPicker> = (args: any) => {
    return <NFTGenerativeItemPicker {...args} />;
};

export const Main = Template.bind({});
Main.args = {
    item: Object.values(Collections.shapesItemChoices)[0],
} as NFTGenerativeItemPickerProps;

Main.argTypes = {
    item: {
        options: Object.keys(Collections.shapesItemChoices),
        mapping: Collections.shapesItemChoices,
        control: {
            type: 'select',
        },
    },
};

const TemplateWithState: ComponentStory<typeof NFTGenerativeItemPickerWithState> = (args: any) => {
    return <NFTGenerativeItemPickerWithState {...args} />;
};

export const MainWithState = TemplateWithState.bind({});
MainWithState.args = {
    item: Object.values(Collections.shapesItemChoices)[0],
} as NFTGenerativeItemPickerProps;

MainWithState.argTypes = {
    item: {
        options: Object.keys(Collections.shapesItemChoices),
        mapping: Collections.shapesItemChoices,
        control: {
            type: 'select',
        },
    },
};

export const ChildrenWithState = TemplateWithState.bind({});
ChildrenWithState.args = {
    showItemChildren: true,
    item: Object.values(Collections.shapesNestedItemChoices)[0],
} as NFTGenerativeItemPickerProps;

ChildrenWithState.argTypes = {
    item: {
        options: Object.keys(Collections.shapesNestedItemChoices),
        mapping: Collections.shapesNestedItemChoices,
        control: {
            type: 'select',
        },
    },
};
