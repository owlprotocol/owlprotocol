import { ComponentStory, ComponentMeta } from '@storybook/react';
import { addressERC20ArgType, addressERC721ArgType, addressERC1155ArgType, networkIdArgType, contractTagsArgType } from '../../../test/storybookArgs';
import { ContractsManagerTable, ContractsManagerTableProps, ContractsManagerTableWhere } from '.';

export default {
    title: 'Contract/ContractsManagerTable',
    component: ContractsManagerTable,
} as ComponentMeta<typeof ContractsManagerTable>;

const Template: ComponentStory<typeof ContractsManagerTable> = (args: any) => <ContractsManagerTable {...args} />;
export const Main = Template.bind({});

const data = [
    { networkId: '1', address: addressERC20ArgType.options[0] },
    { networkId: '1', address: addressERC721ArgType.options[0] },
    { networkId: '1', address: addressERC1155ArgType.options[0] },
];

// @ts-ignore
const mainArgs: ContractsManagerTableProps = {
    data,
};

// @ts-ignore
Main.args = mainArgs;

const TableWhereTemplate: ComponentStory<typeof ContractsManagerTableWhere> = (args: any) => <ContractsManagerTableWhere {...args} />;
export const TableWhere = TableWhereTemplate.bind({});
TableWhere.args = {
    networkId: '1',
    tags: 'Favorites'
}
TableWhere.argTypes = {
    networkId: networkIdArgType,
    tags: contractTagsArgType
}
