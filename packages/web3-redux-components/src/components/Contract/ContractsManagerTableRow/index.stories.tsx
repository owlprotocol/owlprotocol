import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TableContainer, Table, Thead, Tr, Th, Tbody } from '@chakra-ui/react';
import { networkIdArgType, addressArgType } from '../../../test/storybookArgs';
import { ContractsManagerTableRow, ContractsManagerTableRowPropsProps } from '.';

export default {
    title: 'Contract/ContractsManagerTableRow',
    component: ContractsManagerTableRow,
} as ComponentMeta<typeof ContractsManagerTableRow>;

const THEAD_LABELS = ['network', 'address', 'interfaces'];

const Template: ComponentStory<typeof ContractsManagerTableRow> = ({ networkId, address }: ContractsManagerTableRowPropsProps) => (
    <TableContainer>
        <Table variant="unstyled">
            <Thead>
                <Tr>
                    {THEAD_LABELS.map((title: string, key) => (
                        <Th key={key} textTransform={'capitalize'} color={'#92929D'}>
                            {title}
                        </Th>
                    ))}
                </Tr>
            </Thead>
            <Tbody>
                <ContractsManagerTableRow networkId={networkId} address={address} />
            </Tbody>
        </Table>
    </TableContainer>
);
export const Main = Template.bind({});

// @ts-ignore
Main.args = {
    networkId: networkIdArgType.options[0],
    address: addressArgType.options[0],
};

Main.argTypes = {
    networkId: networkIdArgType,
    address: addressArgType,
};
