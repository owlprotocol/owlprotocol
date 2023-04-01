import { Badge, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { Contract, EthLog } from '@owlprotocol/web3-redux';

export interface ContractEventsTableProps {
    networkId: string;
    address: string | undefined;
    eventFormatFull: string | undefined;
}

const THEAD_LABELS = ['name', 'blockNumber', 'logIndex', 'returnValues'];
export const ContractEventsTable = ({ networkId, address, eventFormatFull }: ContractEventsTableProps) => {
    const [events, options] = EthLog.hooks.useEthLogWhere({ networkId, address, eventFormatFull });
    const { isLoading } = options;

    if (isLoading) return <>Loading</>
    else
        return (
            <Table variant="unstyled">
                <Thead>
                    <Tr>
                        {THEAD_LABELS.map((header, key) => (
                            <Th textTransform={'capitalize'} key={key}>
                                {header}
                            </Th>
                        ))}
                    </Tr>
                </Thead>
                <br />
                <Tbody>
                    {events?.map((e) => {
                        const { blockNumber, logIndex, returnValues } = e;

                        return (
                            <Tr key={`${blockNumber}-${logIndex}`}>
                                <Th>
                                    <Td p={0}>
                                        <Badge textTransform={'capitalize'}>{eventFormatFull}</Badge>
                                    </Td>
                                </Th>
                                <Th>
                                    <Td p={0}>{blockNumber}</Td>
                                </Th>
                                <Th>
                                    <Td p={0}>{logIndex}</Td>
                                </Th>
                                <Th>
                                    <Td p={0}>{JSON.stringify(returnValues)}</Td>
                                </Th>
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
        );
};

export default ContractEventsTable;
