import { Collections } from '@owlprotocol/nft-sdk';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NFTGenerativeTraitImagePicker, NFTGenerativeTraitImagePickerProps } from './NFTGenerativeTraitImagePicker.js';

// eslint-disable-next-line import/no-default-export
export default {
    title: 'NFTGenerativeTrait/ImagePicker',
    component: NFTGenerativeTraitImagePicker,
} as ComponentMeta<typeof NFTGenerativeTraitImagePicker>;

const Template: ComponentStory<typeof NFTGenerativeTraitImagePicker> = (args: any) => {
    return <NFTGenerativeTraitImagePicker {...args} />;
};

export const Main = Template.bind({});
Main.args = {
    item: Object.values(Collections.shapesItemChoices)[0],
    name: 'imageBg',
} as NFTGenerativeTraitImagePickerProps;

Main.argTypes = {
    item: {
        options: Object.keys(Collections.shapesItemChoices),
        mapping: Collections.shapesItemChoices,
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
