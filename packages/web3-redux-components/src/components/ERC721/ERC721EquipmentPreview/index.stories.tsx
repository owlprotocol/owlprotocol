import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BaseCollections } from "@owlprotocol/template-data";
import { ERC721EquipmentPreview } from ".";

// eslint-disable-next-line import/no-default-export
export default {
    title: "ERC721/ERC721EquipmentPreview",
    component: ERC721EquipmentPreview,
} as ComponentMeta<typeof ERC721EquipmentPreview>;

const Template: ComponentStory<typeof ERC721EquipmentPreview> = (args: any) => (
    <ERC721EquipmentPreview {...args} />
);

export const Main = Template.bind({});

Main.args = {
    item: Object.values(BaseCollections.shapesItemChoices)[0],
    itemName: "Name of Item",
};
