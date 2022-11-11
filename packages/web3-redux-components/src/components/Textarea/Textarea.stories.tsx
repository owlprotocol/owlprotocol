import { ComponentStory, ComponentMeta } from '@storybook/react';
import Textarea from '.';

export default {
    title: 'Atoms/Textarea',
    component: Textarea,
    argTypes: {
        variant: {
            options: ['', 'form', 'hollow'],
            control: { type: 'select' },
        },
    },
} as ComponentMeta<typeof Textarea>;

const Template: ComponentStory<typeof Textarea> = (args: any) => <Textarea {...args} />;
export const Main = Template.bind({});

Main.args = {
    variant: 'form',
    disabled: false,
};
