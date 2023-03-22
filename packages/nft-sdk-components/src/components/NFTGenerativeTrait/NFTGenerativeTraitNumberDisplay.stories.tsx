import { BaseCollections } from '@owlprotocol/template-data';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BN } from 'bn.js';
import { zip } from 'lodash-es';
import {
    NFTGenerativeTraitNumberDisplay,
    NFTGenerativeTraitNumberDisplayProps,
} from './NFTGenerativeTraitNumberDisplay.js';

// eslint-disable-next-line import/no-default-export
export default {
    title: 'NFTGenerativeTrait/Number',
    component: NFTGenerativeTraitNumberDisplay,
} as ComponentMeta<typeof NFTGenerativeTraitNumberDisplay>;

const Template: ComponentStory<typeof NFTGenerativeTraitNumberDisplay> = (args: any) => {
    return <NFTGenerativeTraitNumberDisplay {...args} />;
};

export const Main = Template.bind({});
Main.args = {
    item: Object.values(BaseCollections.numberItemChoices)[0],
    name: 'strokeWidth',
} as NFTGenerativeTraitNumberDisplayProps;

Main.argTypes = {
    item: {
        options: Object.keys(BaseCollections.numberItemChoices),
        mapping: BaseCollections.numberItemChoices,
        control: {
            type: 'select',
        },
    },
    name: {
        defaultValue: 'strokeWidth',
        options: ['strokeWidth'],
        control: {
            type: 'select',
        },
    },
};
