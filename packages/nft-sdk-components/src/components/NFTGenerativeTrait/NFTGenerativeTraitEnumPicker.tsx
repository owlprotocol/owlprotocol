import { useTheme, Button } from '@chakra-ui/react';
import {
    NFTGenerativeItemClass,
    NFTGenerativeTraitEnumClass,
    NFTGenerativeTraitEnumOption,
} from '@owlprotocol/nft-sdk';

export interface NFTGenerativeTraitEnumPickerProps {
    item: NFTGenerativeItemClass;
    name: string;
    setValue?: (value: string) => any;
}

export const NFTGenerativeTraitEnumPicker = ({
    item,
    name,
    setValue = (value: string) => console.debug(`Selected ${value}`),
}: NFTGenerativeTraitEnumPickerProps) => {
    const { themes } = useTheme();
    const trait = item.collection.traits[name] as NFTGenerativeTraitEnumClass;
    const selected = item.attributesFormatted()[name] as unknown as NFTGenerativeTraitEnumOption;

    return (
        <>
            {trait.options.map((option, key) => (
                <Button
                    key={key}
                    bg={themes.color6}
                    py={6}
                    w={['auto', '20%']}
                    m={2}
                    border={'2px solid'}
                    borderColor={selected === option ? themes.color1 : 'transparent'}
                    onClick={() => setValue(option)}
                    _focus={{ boxShadow: 0 }}
                    _hover={{ bg: themes.color5 }}
                    _active={{ bg: themes.color5 }}
                    textTransform={'capitalize'}
                >
                    {option}
                </Button>
            ))}
        </>
    );
};
