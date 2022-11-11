import { ComponentStory, ComponentMeta } from '@storybook/react';
import CurrencyInputAndSelect from '.';

export default {
    title: 'Atoms/CurrencyInputAndSelect',
    component: CurrencyInputAndSelect,
    argTypes: {
        variant: {
            options: ['', 'form', 'hollow'],
            control: { type: 'select' },
        },
    },
} as ComponentMeta<typeof CurrencyInputAndSelect>;

const Template: ComponentStory<typeof CurrencyInputAndSelect> = (args: any) => <CurrencyInputAndSelect {...args} />;
export const Main = Template.bind({});

Main.args = {
    disabled: false,
};
