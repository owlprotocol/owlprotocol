import { Link } from "@tanstack/react-router";
import { Box, Tr, Td, useTheme, Badge } from "@chakra-ui/react";
import { Network } from "@owlprotocol/web3-redux";
import { AddressDisplay } from "../../../../Address/AddressDisplay";
import { NetworkIcon } from "../../../../NetworkIcon";
import { interfaceIdNames } from "@owlprotocol/contracts";

export interface ContractsManagerTableRowPropsProps {
    id?: string;
    networkId: string;
    address: string;
    interfaceIds?: string[];
    updatedAt?: number;
}

export const ContractsManagerTableRow = ({
    networkId,
    address,
    interfaceIds = [],
}: ContractsManagerTableRowPropsProps) => {
    const { themes } = useTheme();
    const [network] = Network.hooks.useNetwork(networkId);
    const networkName = network?.name;

    return (
        <Tr>
            <Td px={0} py={1}>
                <Box
                    pl={4}
                    h={"60px"}
                    display={"flex"}
                    alignItems={"center"}
                    bg={themes.color6}
                    color={themes.color9}
                    borderLeftRadius={12}
                >
                    <NetworkIcon networkId={networkId} />
                    <Box marginLeft={3}>{networkName}</Box>
                </Box>
            </Td>
            <Td px={0} py={1}>
                <AddressDisplay
                    networkId={networkId}
                    address={address}
                    borderRadius={0}
                    bg={themes.color5}
                />
            </Td>
            <Td px={0} py={1}>
                <Box
                    p={6}
                    h={"60px"}
                    display={"flex"}
                    alignItems={"center"}
                    bg={themes.color6}
                    color={themes.color1}
                    borderRightRadius={12}
                >
                    {interfaceIds.map((id, key) => (
                        <Badge bg={themes.color4} mr={2}>
                            <Link
                                key={key}
                                to={
                                    `/explore/${id}/${address}?networkId=${networkId}` as any
                                }
                            >
                                {interfaceIdNames[id]}
                            </Link>
                        </Badge>
                    ))}
                </Box>
            </Td>
        </Tr>
    );
};
