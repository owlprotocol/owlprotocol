import { SimpleGrid } from "@chakra-ui/react";
import { NFTGenerativeItemId } from "@owlprotocol/web3-redux/src/nftgenerativeitem/model/interface.js";
import { ERC721GenerativeInstance } from "./ERC721GenerativeInstance.js";

export interface ERC721GenerativeInstanceGrid {
    tokens: NFTGenerativeItemId[];
    onClick?: (token: NFTGenerativeItemId) => any;
}

export const ERC721GenerativeInstanceGrid = ({
    tokens,
    onClick,
}: ERC721GenerativeInstanceGrid) => {
    return (
        <SimpleGrid columns={[1, 2, 4]} spacing={4}>
            {tokens.map((token, i) => (
                <ERC721GenerativeInstance
                    key={i}
                    {...token}
                    onSelected={onClick}
                />
            ))}
        </SimpleGrid>
    );
};
