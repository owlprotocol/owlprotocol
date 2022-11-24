import { SimpleGrid, Box, Flex, useTheme } from "@chakra-ui/react";
import {
    ERC721GenerativeInstance,
    ERC721GenerativeInstanceProps,
} from "../../ERC721Generative/ERC721GenerativeInstance";

export interface ERC721InventoryProps {
    inventoryItems?: ERC721GenerativeInstanceProps[];
}

export const ERC721Inventory = ({
    inventoryItems = [],
}: ERC721InventoryProps) => {
    const { themes } = useTheme();

    return (
        <Box
            p={6}
            maxH={600}
            borderRadius={12}
            overflowY={"auto"}
            bg={themes.color3}
        >
            <SimpleGrid spacing={4} columns={{ base: 4, md: 4, lg: 2, xl: 3 }}>
                {inventoryItems.map(
                    (item: ERC721GenerativeInstanceProps, key: any) => (
                        <ERC721GenerativeInstance {...item} />
                    )
                )}
            </SimpleGrid>
        </Box>
    );
};
