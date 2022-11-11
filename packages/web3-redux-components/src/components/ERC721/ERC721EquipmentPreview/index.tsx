import { Box, Text, useTheme } from '@chakra-ui/react';
import { NFTGenerativeItemImageDisplay, NFTGenerativeItemImageDisplayProps } from '@owlprotocol/nft-sdk-components';

export interface ERC721EquipmentPreviewProps {
    item?: NFTGenerativeItemImageDisplayProps;
    itemName?: string;
}

export const ERC721EquipmentPreview = ({ item = [], itemName = '' }: ERC721EquipmentPreviewProps) => {
    const { themes } = useTheme();

    return (
        <Box
            borderStyle={'solid'}
            borderWidth={1}
            borderColor={themes.color11}
            borderRadius={12}
            p={4}
            w={'100%'}
            maxH={600}
        >
            <Box bg={themes.color6} h={['272px', '472px']} borderRadius={12} mb={6}>
                <NFTGenerativeItemImageDisplay item={item} />
            </Box>
            <Text
                p={[3, 5]}
                borderRadius={12}
                fontSize={[14, 24]}
                fontWeight={600}
                borderWidth={2}
                borderStyle={'solid'}
                borderColor={themes.color6}
                textAlign={'center'}
            >
                {itemName}
            </Text>
        </Box>
    );
};

export default ERC721EquipmentPreview;
