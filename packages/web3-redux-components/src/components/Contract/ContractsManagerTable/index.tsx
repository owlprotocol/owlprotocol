import { Box, TableContainer, Table, Thead, Tr, Th, Tbody, useTheme } from '@chakra-ui/react';
import { Contract } from '@owlprotocol/web3-redux';
import { ContractsManagerTableRow } from '../ContractsManagerTableRow';

export interface ContractListProps {
    networkId: string;
    address: string;
}

export interface ContractsManagerTableProps {
    data: ContractListProps[];
}

export const ContractsManagerTable = ({ data }: ContractsManagerTableProps) => {
    const { themes } = useTheme();

    if (data.length < 1) {
        return (
            <Box mt={4} px={4} p={3} borderWidth={1} borderRadius={12}>
                No contracts found
            </Box>
        );
    }

    return (
        <TableContainer>
            <Table variant="unstyled">
                <Thead>
                    <Tr>
                        {['network', 'address', 'interfaces'].map((title: string, key) => (
                            <Th key={key} textTransform={'capitalize'} color={themes.color9}>
                                {title}
                            </Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((props: ContractListProps, key) => (
                        <ContractsManagerTableRow key={key} {...props} />
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
};

export const ContractsManagerTableWhere = ({ networkId, tags }: { networkId?: string, tags?: string }) => {
    //@ts-ignore
    const [contracts] = Contract.hooks.useWhere({ networkId, tags })
    const data = (contracts ?? []).map(({ networkId, address }) => { return { networkId, address } });
    return <ContractsManagerTable data={data} />
}
