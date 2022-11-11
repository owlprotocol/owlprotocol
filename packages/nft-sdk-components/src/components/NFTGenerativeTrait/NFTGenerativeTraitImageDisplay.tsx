import { useTheme, Text, VStack, Image, Badge } from '@chakra-ui/react';
import { NFTGenerativeItemClass, NFTGenerativeTraitImage, NFTGenerativeTraitImageOption } from '@owlprotocol/nft-sdk';

export interface NFTGenerativeTraitImageDisplayProps {
    item: NFTGenerativeItemClass;
    name: string;
    active?: boolean;
}

const mimeType = {
    svg: 'image/svg+xml',
    png: 'image/png',
};

export const NFTGenerativeTraitImageDisplay = ({ item, name, active }: NFTGenerativeTraitImageDisplayProps) => {
    const { themes } = useTheme();
    const trait = item.collection.traits[name] as unknown as NFTGenerativeTraitImage;
    const attribute = item.attributesFormatted()[name] as unknown as NFTGenerativeTraitImageOption;
    const image = attribute.image!.toString();
    const imageEncoded = encodeURIComponent(image);
    const imageData = `data:${mimeType[trait.image_type]};utf8,${imageEncoded}`;

    return (
        <VStack
            p={4}
            m={4}
            border={'1px solid'}
            borderColor={active ? themes.color1 : 'transparent'}
            borderRadius={10}
            bg={themes.color6}
            color={themes.color7}
            fontSize={14}
            lineHeight={1}
            justify={'center'}
            textTransform={'capitalize'}
            _hover={{
                bg: themes.color5,
                transition: '250ms ease',
            }}
        >
            <Badge fontWeight={600} fontSize={12} py={1}>
                {name}
            </Badge>
            <Text fontWeight={400} textTransform={'none'}>
                {attribute.value}
            </Text>
            <Image src={imageData} alt={attribute.value} userSelect={'none'} />
        </VStack>
    );
};
