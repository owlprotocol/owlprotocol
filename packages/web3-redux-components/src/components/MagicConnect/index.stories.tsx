import { ComponentStory, ComponentMeta } from "@storybook/react";
import MagicConnect, { Props } from ".";

export default {
    title: "Network/MagicConnect",
    component: MagicConnect,
    parameters: {
        docs: {
            description: {
                component:
                    "Utilize Magic Connect to let user login with Google account",
            },
        },
    },
} as ComponentMeta<typeof MagicConnect>;
const Template: ComponentStory<typeof MagicConnect> = (args: Props) => (
    <MagicConnect {...args} />
);

export const Main = Template.bind({});

Main.args = {
    defaultNetworkIdx: 1,
};
