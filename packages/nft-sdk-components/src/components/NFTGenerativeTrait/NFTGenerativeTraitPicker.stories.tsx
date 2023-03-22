import { BaseCollections } from '@owlprotocol/template-data';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NFTGenerativeTraitPicker, NFTGenerativeTraitPickerProps } from './NFTGenerativeTraitPicker.js';

// eslint-disable-next-line import/no-default-export
export default {
    title: 'NFTGenerativeTrait/TraitPicker',
    component: NFTGenerativeTraitPicker,
} as ComponentMeta<typeof NFTGenerativeTraitPicker>;

const Template: ComponentStory<typeof NFTGenerativeTraitPicker> = (args: any) => {
    return <NFTGenerativeTraitPicker {...args} />;
};

export const Main = Template.bind({});
Main.args = {
    item: Object.values(BaseCollections.shapesItemChoices)[0],
    name: 'faction',
} as NFTGenerativeTraitPickerProps;

Main.argTypes = {
    item: {
        options: Object.keys(BaseCollections.shapesItemChoices),
        mapping: BaseCollections.shapesItemChoices,
        control: {
            type: 'select',
        },
    },
    name: {
        defaultValue: 'faction',
        options: Object.keys(BaseCollections.collectionShapes.traits),
        control: {
            type: 'select',
        },
    },
};
