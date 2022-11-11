import { Container, HStack, Box, Text, useTheme } from '@chakra-ui/react';
import ERC721EquipmentPreview from '../ERC721EquipmentPreview/index';
import EquipmentSideList from '../ERC721EquipmentPreview/EquipmentSideList/index';
import { ERC721Inventory } from '../ERC721Inventory';

const ERC721EquipmentPresentation = ({ item, itemName, tokens, inventoryItems }: any) => {
    const { themes } = useTheme();

    return (
        <Container mb={[10, 20]} maxW={'100%'}>
            <HStack
                justify={'space-between'}
                align={'flex-start'}
                flexDir={['column', 'column', 'row', 'row']}
                gap={[10, 4]}
                mb={10}
            >
                <Box w={['100%', '100%', '100%', '50%']}>
                    <Box mb={14}>
                        <Box fontWeight={'bold'} fontSize={24} mb={4}>
                            Equipment/Unequipment NFT
                        </Box>
                        <Text>Choose a character to equip</Text>
                    </Box>
                    <HStack align={'flex-start'} justify={'center'} gap={6}>
                        <EquipmentSideList tokens={tokens} />
                        <Box maxW={500}>
                            <ERC721EquipmentPreview item={item} itemName={itemName} />
                        </Box>
                    </HStack>
                </Box>
                <Box w={'1px'} h={'95vh'} bg={themes.color6} />
                <Box w={['100%', '100%', '100%', '50%']}>
                    <Box mb={14}>
                        <Box fontWeight={'bold'} fontSize={24} mb={4}>
                            Inventory
                        </Box>
                        <Text>Inventory is used to fill empty item slot on character</Text>
                    </Box>
                    <ERC721Inventory inventoryItems={inventoryItems} />
                </Box>
            </HStack>
        </Container>
    );
};

export default ERC721EquipmentPresentation;
