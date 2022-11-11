import { useTheme, HStack, Box, Text, Tr, Td, Link } from '@chakra-ui/react';
import { ReactComponent as IconSale } from './assets/icon-sale.svg';
import { ReactComponent as IconList } from './assets/icon-list.svg';
import { ReactComponent as IconOffer } from './assets/icon-offer.svg';
import { ReactComponent as IconTransfer } from './assets/icon-transfer.svg';
import NetworkIcon from '../NetworkIcon';
import { ItemProps } from './index.js';
import timeago from 'time-ago';

const getEventIcon = (eventName: any) => {
    switch (String(eventName).toLocaleLowerCase()) {
        case 'sale':
            return <IconSale />;
        case 'list':
            return <IconList />;
        case 'offer':
            return <IconOffer />;
        case 'transfer':
            return <IconTransfer />;

        default:
            return <IconSale />;
    }
};

const NFTTransactions = ({ event, price, from, to, date }: ItemProps) => {
    const { themes } = useTheme();

    return (
        <Tr>
            <Td>
                <HStack>
                    <Box boxSize={6}>{getEventIcon(event)}</Box>
                    <Text fontSize={14} fontWeight={600} color={themes.color8}>
                        {event}
                    </Text>
                </HStack>
            </Td>

            <Td>
                <HStack>
                    <NetworkIcon networkId={1} size={16} />
                    <Text fontSize={14} fontWeight={600} color={themes.color8}>
                        {price}
                    </Text>
                </HStack>
            </Td>

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

            <Td>{timeago.ago(date)}</Td>
        </Tr>
    );
};

export default NFTTransactions;
