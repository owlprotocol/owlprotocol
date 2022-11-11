import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NetworkTable } from '.';

const Template: ComponentStory<typeof NetworkTable> = (args: any) => <NetworkTable {...args} />;
export const Main = Template.bind({});
export default {
    title: 'Network/Table',
    component: NetworkTable,
} as ComponentMeta<typeof NetworkTable>;
