import { BaseCollections } from '@owlprotocol/template-data';
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
    item: Object.values(BaseCollections.shapesItemChoices)[0],
} as NFTGenerativeItemPickerProps;

Main.argTypes = {
    item: {
        options: Object.keys(BaseCollections.shapesItemChoices),
        mapping: BaseCollections.shapesItemChoices,
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
    item: Object.values(BaseCollections.shapesItemChoices)[0],
} as NFTGenerativeItemPickerProps;

MainWithState.argTypes = {
    item: {
        options: Object.keys(BaseCollections.shapesItemChoices),
        mapping: BaseCollections.shapesItemChoices,
        control: {
            type: 'select',
        },
    },
};

export const ChildrenWithState = TemplateWithState.bind({});
ChildrenWithState.args = {
    showItemChildren: true,
    item: Object.values(BaseCollections.shapesNestedItemChoices)[0],
} as NFTGenerativeItemPickerProps;

ChildrenWithState.argTypes = {
    item: {
        options: Object.keys(BaseCollections.shapesNestedItemChoices),
        mapping: BaseCollections.shapesNestedItemChoices,
        control: {
            type: 'select',
        },
    },
};
