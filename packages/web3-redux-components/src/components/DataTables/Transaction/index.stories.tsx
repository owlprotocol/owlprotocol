import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TransactionTablePresenter } from "./presenter";

export default {
    title: "Tables/Transaction/Table",
    component: TransactionTablePresenter,
} as ComponentMeta<typeof TransactionTablePresenter>;

const Template: ComponentStory<typeof TransactionTablePresenter> = () => (
    <TransactionTablePresenter />
);
export const Main = Template.bind({});
