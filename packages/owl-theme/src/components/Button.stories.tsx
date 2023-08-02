import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button, HStack, Stack } from "@chakra-ui/react";

export default {
    title: "Atoms/Button",
    component: Button,
    argTypes: {
        variant: {
            options: ["", "defaultStyle", "form", "hollow", "cancel", "grad-1"],
            control: { type: "select" },
        },
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args: any) => (
    <Stack spacing={10}>
        <HStack>
            <Button>Regular Button</Button>
            <Button variant="hollow">Hollow Button</Button>
            <Button variant="cube">&times;</Button>
            <Button variant="grad-1">Gradient 1</Button>
        </HStack>
        <div>
            <div>variant controled button</div>
            <Button {...args}>Variants Button</Button>
        </div>
    </Stack>
);
export const Main = Template.bind({});

Main.args = {
    variant: "form",
    disabled: false,
};
