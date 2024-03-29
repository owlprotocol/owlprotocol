import { Badge, useTheme, Text, VStack } from '@chakra-ui/react';
import { NFTGenerativeItemClass, NFTGenerativeTraitEnumOption } from '@owlprotocol/nft-sdk';

export interface NFTGenerativeTraitEnumDisplayProps {
    item: NFTGenerativeItemClass;
    name: string;
}

export const NFTGenerativeTraitEnumDisplay = ({ item, name }: NFTGenerativeTraitEnumDisplayProps) => {
    const { themes } = useTheme();
    const attribute = item.attributesFormatted()[name] as unknown as NFTGenerativeTraitEnumOption;

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
                {
                    //@ts-expect-error
                    attribute.value
                }
            </Text>
        </VStack>
    );
};
