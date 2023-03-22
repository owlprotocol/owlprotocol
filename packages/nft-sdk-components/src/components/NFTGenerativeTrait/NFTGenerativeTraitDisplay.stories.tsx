import { BaseCollections } from '@owlprotocol/template-data';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NFTGenerativeTraitDisplay, NFTGenerativeTraitDisplayProps } from './NFTGenerativeTraitDisplay.js';

// eslint-disable-next-line import/no-default-export
export default {
    title: 'NFTGenerativeTrait/Trait',
    component: NFTGenerativeTraitDisplay,
} as ComponentMeta<typeof NFTGenerativeTraitDisplay>;

const Template: ComponentStory<typeof NFTGenerativeTraitDisplay> = (args: any) => {
    return <NFTGenerativeTraitDisplay {...args} />;
};

export const Main = Template.bind({});
Main.args = {
    item: Object.values(BaseCollections.shapesItemChoices)[0],
    name: 'faction',
} as NFTGenerativeTraitDisplayProps;

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
