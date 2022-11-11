import {
    Box,
    NumberInput,
    NumberInputField,
    NumberIncrementStepper,
    NumberDecrementStepper,
    useTheme,
} from '@chakra-ui/react';
import { NFTGenerativeItemClass, NFTGenerativeTraitColor } from '@owlprotocol/nft-sdk';
import { useState } from 'react';
import { ReactComponent as IconChevron } from '../../assets/chevron.svg';

export interface NFTGenerativeTraitColorPickerProps {
    item: NFTGenerativeItemClass;
    name: string;
    setValue?: (value: number) => any;
}

export const NFTGenerativeTraitColorPicker = ({
    item,
    name,
    setValue = (value: number) => console.debug(`Selected ${value}`),
}: NFTGenerativeTraitColorPickerProps) => {
    const { themes } = useTheme();

    const [isEmpty, setIsEmpty] = useState(false);

    const trait = item.collection.traits[name] as unknown as NFTGenerativeTraitColor;
    const selected = item.attributes[name] as number;

    return (
        <Box color={themes.color4} my={4}>
            <NumberInput
                display={'flex'}
                defaultValue={trait.min}
                min={trait.min ?? 0}
                max={trait.max ?? 255}
                bg={'transparent'}
                borderColor={'transparent'}
                value={!isEmpty ? selected : ''}
                onChange={(valueString) => {
                    if (valueString.length == 0) setIsEmpty(true);
                    const val = parseInt(valueString);
                    if (Number.isInteger(val) && (trait.min ?? 0) <= val && val <= (trait.max ?? 255)) {
                        setIsEmpty(false);
                        console.debug({ val });
                        setValue(val);
                    }
                }}
            >
                <NumberDecrementStepper border={0} borderRadius={0} mx={4} flexGrow={0}>
                    <Box boxSize={6} transform={'rotate(180deg)'}>
                        <IconChevron />
                    </Box>
                </NumberDecrementStepper>
                <NumberInputField
                    h={'52px'}
                    w={'168px'}
                    bg={themes.color6}
                    borderRadius={8}
                    _hover={{ borderColor: 'transparent' }}
                    textAlign={'center'}
                    fontWeight={600}
                    fontSize={14}
                    p={0}
                />
                <NumberIncrementStepper border={0} borderRadius={0} mx={4} flexGrow={0}>
                    <Box boxSize={6}>
                        <IconChevron />
                    </Box>
                </NumberIncrementStepper>
                <Box
                    bg={`rgb(${selected}, ${selected}, ${selected})`}
                    w={'60px'}
                    h={'52px'}
                    display={'inline-block'}
                    borderRadius={8}
                    flexShrink={0}
                />
            </NumberInput>
        </Box>
    );
};
