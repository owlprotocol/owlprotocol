import { ComponentStory, ComponentMeta } from "@storybook/react";
import Icon, { ICONS, Props } from ".";

export default {
    title: "Atoms/Icons",
    component: Icon,
    argTypes: {
        icon: {
            options: Object.keys(ICONS),
            control: { type: "select" },
        },
    },
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args: Props) => (
    <Icon {...args} />
);

export const Main = Template.bind({});

const args: Props = {
    icon: "ETH",
    size: 62,
    transform: "rotate(0deg)",
};
Main.args = args;
