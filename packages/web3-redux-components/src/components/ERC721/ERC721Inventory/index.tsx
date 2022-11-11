import { Box, Flex, useTheme } from '@chakra-ui/react';
import { ERC721Instance, ERC721InstanceProps } from '../ERC721Instance/index.js';

export interface ERC721InventoryProps {
    inventoryItems?: ERC721InstanceProps[];
}

export const ERC721Inventory = ({ inventoryItems = [] }: ERC721InventoryProps) => {
    const { themes } = useTheme();

    return (
        <Flex bg={themes.color5} borderRadius={12} gap={4} wrap={'wrap'} p={6} maxH={600} overflowY={'auto'}>
            {inventoryItems.map((item: ERC721InstanceProps, key: any) => (
                <Box
                    key={key}
                    maxW={171}
                    minW={160}
                    borderRadius={12}
                    bg={'rgba(255, 255, 255, 0.04)'}
                    _hover={{ opacity: 0.6 }}
                    transition={'300ms'}
                >
                    <ERC721Instance {...item} />
                </Box>
            ))}
        </Flex>
    );
};
