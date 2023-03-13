import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
    networkIdArgType,
    contractTagsArgType,
} from "../../../../test/storybookArgs";
import { ContractsManagerTable, ContractsManagerTableWhere } from ".";

export default {
    title: "Tables/Contract/Manage",
    component: ContractsManagerTable,
} as ComponentMeta<typeof ContractsManagerTable>;

const Template: ComponentStory<typeof ContractsManagerTable> = (args: any) => (
    <ContractsManagerTable {...args} />
);
export const Main = Template.bind({});

const TableWhereTemplate: ComponentStory<typeof ContractsManagerTableWhere> = (
    args: any
) => <ContractsManagerTableWhere {...args} />;
export const TableWhere = TableWhereTemplate.bind({});
TableWhere.args = {
    networkId: "31337",
    tags: ["Favorites"],
};
TableWhere.argTypes = {
    networkId: networkIdArgType,
    tags: contractTagsArgType,
};
