import { Badge, Text, VStack, useTheme } from '@chakra-ui/react';
import { NFTGenerativeItemClass, NFTGenerativeTraitOption } from '@owlprotocol/nft-sdk';
export interface NFTGenerativeTraitColorDisplayProps {
    item: NFTGenerativeItemClass;
    name: string;
}

export const NFTGenerativeTraitColorDisplay = ({ item, name }: NFTGenerativeTraitColorDisplayProps) => {
    const { themes } = useTheme();
    const attribute = item.attributesFormatted()[name] as NFTGenerativeTraitOption;

    return (
        <VStack
            w={['100%', '20%']}
            py={4}
            border={'1px solid'}
            borderColor={themes.color1}
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
                {attribute}
            </Text>
        </VStack>
    );
};
