import { Box, SimpleGrid } from "@chakra-ui/react";
import { Token } from "../../../interfaces/Token.js";
import {
    ERC721Instance,
    ERC721InstanceProps,
} from "../ERC721Instance/index.js";

export interface ERC721InstanceGrid {
    tokens: ERC721InstanceProps[];
    onClick?: ({ networkId, address, tokenId }: Partial<Token>) => any;
}

export const ERC721InstanceGrid = ({ tokens, onClick }: ERC721InstanceGrid) => {
    return (
        <SimpleGrid columns={[1, 2, 4]} spacing={4}>
            {tokens.map((token, i) => (
                <Box key={i} _hover={{ opacity: 0.6 }} transition={"300ms"}>
                    <ERC721Instance
                        {...token}
                        onClick={onClick ?? token.onClick}
                    />
                </Box>
            ))}
        </SimpleGrid>
    );
};
