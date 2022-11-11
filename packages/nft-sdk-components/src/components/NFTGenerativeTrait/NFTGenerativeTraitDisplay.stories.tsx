import { Collections } from '@owlprotocol/nft-sdk';
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
    item: Object.values(Collections.shapesItemChoices)[0],
    name: 'faction',
} as NFTGenerativeTraitDisplayProps;

Main.argTypes = {
    item: {
        options: Object.keys(Collections.shapesItemChoices),
        mapping: Collections.shapesItemChoices,
        control: {
            type: 'select',
        },
    },
    name: {
        defaultValue: 'faction',
        options: Object.keys(Collections.collectionShapes.traits),
        control: {
            type: 'select',
        },
    },
};
