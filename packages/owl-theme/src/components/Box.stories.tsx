import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Box } from "@chakra-ui/react";

export default {
    title: "Atoms/Box",
    component: Box,
    args: {
        variant: "card-container",
    },
    argTypes: {
        variant: {
            options: ["card-container", "card"],
            control: { type: "select" },
        },
    },
} as ComponentMeta<typeof Box>;

const Template: ComponentStory<typeof Box> = (args: any) => (
    <Box {...args}>THIS IS AN EXAMPLE OF CARD</Box>
);
export const Main = Template.bind({});
