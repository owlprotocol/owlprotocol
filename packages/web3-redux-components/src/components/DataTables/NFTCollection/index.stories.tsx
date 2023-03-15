import { ComponentStory, ComponentMeta } from "@storybook/react";
import { NFTCollectionTablePresenter } from "./presenter";

export default {
    title: "Tables/NFTCollection/Table",
    component: NFTCollectionTablePresenter,
} as ComponentMeta<typeof NFTCollectionTablePresenter>;

const Template: ComponentStory<typeof NFTCollectionTablePresenter> = () => (
    <NFTCollectionTablePresenter />
);
export const Main = Template.bind({});
