import { Badge, Text, VStack, useTheme } from '@chakra-ui/react';
import { NFTGenerativeItemClass, NFTGenerativeTraitColormapOption } from '@owlprotocol/nft-sdk';

export interface NFTGenerativeTraitColormapDisplayProps {
    item: NFTGenerativeItemClass;
    name: string;
    active?: boolean;
}

export const NFTGenerativeTraitColormapDisplay = ({ item, name, active }: NFTGenerativeTraitColormapDisplayProps) => {
    const { themes } = useTheme();
    const attribute = item.attributesFormatted()[name] as NFTGenerativeTraitColormapOption;

    return (
        <VStack
            w={['100%', '20%']}
            py={4}
            border={'1px solid'}
            borderColor={active ? themes.color1 : 'transparent'}
            borderRadius={10}
            bg={themes.color6}
            color={themes.color7}
            fontSize={14}
            lineHeight={1}
            justify={'center'}
            textTransform={'capitalize'}
        >
            <Badge fontWeight={600} fontSize={12} py={1}>
                {name}
            </Badge>
            <Text fontWeight={400} textTransform={'none'}>
                {attribute.value}
            </Text>
        </VStack>
    );
};
