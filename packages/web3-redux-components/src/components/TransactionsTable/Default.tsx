import { Tr, Td, Badge, Link } from '@chakra-ui/react';
import { ItemProps } from './index.js';

const Default = ({ txHash, method, blockNumber, age, from, to, value, fee }: ItemProps) => (
    <Tr>
        <Td>
            <Link fontSize={14} fontWeight={600} href={`/tx/${txHash}`}>
                {txHash}
            </Link>
        </Td>

        <Td>
            <Badge textTransform={'capitalize'}>{method}</Badge>
        </Td>

        <Td>
            <Link fontSize={14} fontWeight={600} href={`/block/${blockNumber}`}>
                {blockNumber}
            </Link>
        </Td>

        <Td>{age}</Td>

        <Td>
            <Link fontSize={14} fontWeight={600} href={`/address/${from}`}>
                {from}
            </Link>
        </Td>

        <Td>
            <Link fontSize={14} fontWeight={600} href={`/address/${to}`}>
                {to}
            </Link>
        </Td>

        <Td>{value}</Td>

        <Td>{fee}</Td>
    </Tr>
);

export default Default;
