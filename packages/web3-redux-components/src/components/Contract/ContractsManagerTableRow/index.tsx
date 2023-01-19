import { Link } from '@tanstack/react-router';
import { Box, Tr, Td, useTheme } from '@chakra-ui/react';
import { Contract, Network } from '@owlprotocol/web3-redux';

import { AddressDisplay } from '../../Address/AddressDisplay';
import { NetworkIcon } from '../../NetworkIcon'

export interface ContractsManagerTableRowPropsProps {
    networkId: string;
    address: string;
}

const SUPPORTED_INTERFACES = new Set(['ERC20', 'ERC721', 'ERC1155']);

export const ContractsManagerTableRow = ({ networkId, address }: ContractsManagerTableRowPropsProps) => {
    const { themes } = useTheme();
    const [network] = Network.hooks.useNetwork(networkId);
    const networkName = network?.name;

    const [contract] = Contract.hooks.useContract(networkId, address);
    const indexIds = contract?.tags ?? [];
    const interfaces = indexIds.filter((idx) => SUPPORTED_INTERFACES.has(idx));
    console.log(interfaces);

    return (
        <Tr>
            <Td px={0}>
                <Box
                    pl={4}
                    h={'60px'}
                    display={'flex'}
                    alignItems={'center'}
                    bg={themes.color6}
                    color={themes.color9}
                    borderLeftRadius={12}
                >
                    <NetworkIcon networkId={networkId} />
                    <Box marginLeft={3}>{networkName}</Box>
                </Box>
            </Td>
            <Td px={0}>
                <AddressDisplay networkId={networkId} address={address} borderRadius={0} bg={themes.color5} />
            </Td>
            <Td px={0}>
                <Box
                    p={6}
                    h={'60px'}
                    display={'flex'}
                    alignItems={'center'}
                    bg={themes.color6}
                    color={themes.color1}
                    borderRightRadius={12}
                >
                    {interfaces.map((i, key) => (
                        <Link key={key} to={`/manage/${i.toLowerCase()}/${address}?networkId=${networkId}`}>
                            {i}
                        </Link>
                    ))}
                </Box>
            </Td>
        </Tr>
    );
};
