import { ComponentStory, ComponentMeta } from '@storybook/react';
import Input from '.';

export default {
    title: 'Atoms/Input',
    component: Input,
    argTypes: {
        variant: {
            options: ['', 'form', 'hollow'],
            control: { type: 'select' },
        },
    },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args: any) => <Input {...args} />;
export const Main = Template.bind({});

Main.args = {
    variant: 'form',
    disabled: false,
};
