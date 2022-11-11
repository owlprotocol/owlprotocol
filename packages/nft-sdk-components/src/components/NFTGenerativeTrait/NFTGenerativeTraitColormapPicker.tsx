import { Box, Text, Button, useTheme, HStack } from '@chakra-ui/react';
import {
    NFTGenerativeItemClass,
    NFTGenerativeTraitColormapClass,
    NFTGenerativeTraitColormapOption,
} from '@owlprotocol/nft-sdk';
import { useState } from 'react';
import { ReactComponent as IconChevron } from '../../assets/chevron.svg';

export interface NFTGenerativeTraitColormapPickerProps {
    item: NFTGenerativeItemClass;
    name: string;
    setValue?: (value: string) => any;
}

export const NFTGenerativeTraitColormapPicker = ({
    item,
    name,
    setValue = (value: string) => console.debug(`Selected ${value}`),
}: NFTGenerativeTraitColormapPickerProps) => {
    const { themes } = useTheme();
    const [idx, setIdx] = useState(0);

    const trait = item.collection.traits[name] as NFTGenerativeTraitColormapClass;
    const options = trait.options;

    //Item with image parameters defined by DNA (eg. color, colormap, stroke_width params)
    const selected = item.attributesFormatted()[name] as NFTGenerativeTraitColormapOption;
    const disablePrevButton = idx === 0;
    const disableNextButton = idx === options.length - 1;

    const handlePrev = () => {
        if (idx > 0) {
            setIdx(idx - 1);
            setValue(options[idx].value);
        } else {
            return;
        }
    };

    const handleNext = () => {
        if (idx < options.length - 1) {
            setIdx(idx + 1);
            setValue(options[idx].value);
        } else {
            return;
        }
    };

    return (
        <Box color={themes.color4} mb={3} my={2}>
            <HStack>
                <Button
                    m={0}
                    border={0}
                    borderRadius={0}
                    bg={'transparent'}
                    onClick={handlePrev}
                    _hover={{ bg: 'transparent' }}
                    disabled={disablePrevButton}
                >
                    <Box boxSize={6} transform={'rotate(180deg)'}>
                        <IconChevron />
                    </Box>
                </Button>
                <Text
                    h={'52px'}
                    w={'168px'}
                    bg={themes.color6}
                    borderRadius={8}
                    textAlign={'center'}
                    fontWeight={600}
                    fontSize={14}
                    pt={4}
                    textTransform={'capitalize'}
                >
                    {selected.value}
                </Text>
                <Button
                    border={0}
                    borderRadius={0}
                    bg={'transparent'}
                    onClick={handleNext}
                    _hover={{ bg: 'transparent' }}
                    disabled={disableNextButton}
                >
                    <Box boxSize={6}>
                        <IconChevron />
                    </Box>
                </Button>
                <Box h={'52px'} w={'100%'} maxW={'482px'} borderRadius={8} overflow={'hidden'}>
                    {selected?.colors.map((color, key) => (
                        <Box
                            key={key}
                            w={'calc(100% / 255)'}
                            h={'100%'}
                            m={0}
                            display={'inline-block'}
                            bg={`rgb(${color.join()})`}
                        />
                    ))}
                </Box>
            </HStack>
        </Box>
    );
};
