import { ComponentStory, ComponentMeta } from "@storybook/react";
import ERC20Logo, { Props } from ".";

export default {
    title: "ERC20/ERC20Logo",
    component: ERC20Logo,
    args: {
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    } as Props,
} as ComponentMeta<typeof ERC20Logo>;

const Template: ComponentStory<typeof ERC20Logo> = (args: Props) => (
    <ERC20Logo {...args} />
);
export const Main = Template.bind({});
