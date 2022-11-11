import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    useTheme,
} from '@chakra-ui/react';
import { NFTGenerativeItemClass, NFTGenerativeTraitNumber } from '@owlprotocol/nft-sdk';
import { useState } from 'react';

export interface NFTGenerativeTraitNumberPickerProps {
    item: NFTGenerativeItemClass;
    name: string;
    setValue?: (value: number) => any;
}

export const NFTGenerativeTraitNumberPicker = ({
    item,
    name,
    setValue = (value: number) => console.debug(`Selected ${value}`),
}: NFTGenerativeTraitNumberPickerProps) => {
    const { themes } = useTheme();
    const [isEmpty, setIsEmpty] = useState(false);

    const trait = item.collection.traits[name] as unknown as NFTGenerativeTraitNumber;
    const selected = item.attributesFormatted()[name] as number;

    return (
        <NumberInput
            w={'100%'}
            maxW={'168px'}
            defaultValue={trait.min}
            min={trait.min}
            max={trait.max}
            bg={themes.color6}
            border={0}
            borderColor={'transparent'}
            borderRadius={8}
            value={!isEmpty ? selected : ''}
            onChange={(valueString) => {
                if (valueString.length == 0) setIsEmpty(true);
                const val = parseInt(valueString);
                if (Number.isInteger(val) && trait.min <= val && val <= trait.max) {
                    setIsEmpty(false);
                    console.debug({ val });
                    setValue(val);
                }
            }}
        >
            <NumberInputField />
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>
    );
};
