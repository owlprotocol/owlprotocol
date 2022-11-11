import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ExampleTable as Table, Props } from '.';

const Template: ComponentStory<typeof Table> = (args: Props) => <Table {...args} />;
export const Main = Template.bind({});

const Args: Props = {
    data: [
        { firstName: 'John', lastName: 'Doe' },
        { firstName: 'Alice', lastName: 'Miller' },
    ],
};

Main.args = Args;
Main.argTypes = {};

export default {
    title: 'Tables/ExampleTable',
    component: Table,
} as ComponentMeta<typeof Table>;
