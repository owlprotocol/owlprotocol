import { ComponentStory, ComponentMeta } from "@storybook/react";
import { NetworkTable } from ".";

const Template: ComponentStory<typeof NetworkTable> = (args: any) => (
    <NetworkTable {...args} />
);
export const Main = Template.bind({});
export default {
    title: "Tables/Network/Main",
    component: NetworkTable,
    parameters: {
        docs: {
            description: {
                component: "List of the available networks",
            },
        },
    },
} as ComponentMeta<typeof NetworkTable>;
