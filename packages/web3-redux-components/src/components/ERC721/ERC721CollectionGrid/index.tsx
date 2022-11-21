import { SimpleGrid } from "@chakra-ui/react";
import { Contract } from "@owlprotocol/web3-redux";
import { ERC721Instance } from "../ERC721Instance/index.js";

export interface ContractEventsTableProps {
    networkId: string | undefined;
    address: string | undefined;
    eventName: string | undefined;
}

export const ERC721CollectionGrid = ({
    networkId,
    address,
}: ContractEventsTableProps) => {
    const [tokenIds, options] = Contract.hooks.useERC721TokenIds(
        networkId,
        address,
        {
            past: true,
            limit: 50,
            fromBlock: 0,
        }
    );
    const { error } = options;

    if (error) return <>Error: {error.message}</>;
    else
        return (
            <SimpleGrid columns={[1, 2, 4]} spacing={4}>
                {tokenIds.map((id) => (
                    <ERC721Instance
                        key={id}
                        networkId={networkId}
                        address={address}
                        tokenId={id}
                    />
                ))}
            </SimpleGrid>
        );
};
