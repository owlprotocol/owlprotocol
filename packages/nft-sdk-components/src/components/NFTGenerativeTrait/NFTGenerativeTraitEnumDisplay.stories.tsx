import { BaseCollections } from '@owlprotocol/template-data';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NFTGenerativeTraitEnumDisplay, NFTGenerativeTraitEnumDisplayProps } from './NFTGenerativeTraitEnumDisplay.js';

// eslint-disable-next-line import/no-default-export
export default {
    title: 'NFTGenerativeTrait/Enum',
    component: NFTGenerativeTraitEnumDisplay,
} as ComponentMeta<typeof NFTGenerativeTraitEnumDisplay>;

const Template: ComponentStory<typeof NFTGenerativeTraitEnumDisplay> = (args: any) => {
    return <NFTGenerativeTraitEnumDisplay {...args} />;
};

export const Main = Template.bind({});
Main.args = {
    item: Object.values(BaseCollections.enumItemChoices)[0],
    name: 'faction',
} as NFTGenerativeTraitEnumDisplayProps;

Main.argTypes = {
    item: {
        options: Object.keys(BaseCollections.enumItemChoices),
        mapping: {
            collectionEnum: BaseCollections.enumItemChoices,
        },
        control: {
            type: 'select',
        },
    },
    name: {
        defaultValue: 'faction',
        options: ['faction'],
        control: {
            type: 'select',
        },
    },
};
