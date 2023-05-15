import { ComponentStory, ComponentMeta } from "@storybook/react";
import Icon from ".";

export default {
    title: "Atoms/Icon",
    component: Icon,
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args: any) => <Icon {...args} />;

export const Main = Template.bind({});
