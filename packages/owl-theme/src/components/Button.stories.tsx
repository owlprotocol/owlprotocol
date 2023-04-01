import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button } from "@chakra-ui/react";

export default {
    title: "Atoms/Button",
    component: Button,
    argTypes: {
        variant: {
            options: ["form", "hollow", "cancel"],
            control: { type: "select" },
        },
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args: any) => (
    <Button {...args}>Hello Owl Button</Button>
);
export const Main = Template.bind({});

Main.args = {
    variant: "form",
    disabled: false,
};
