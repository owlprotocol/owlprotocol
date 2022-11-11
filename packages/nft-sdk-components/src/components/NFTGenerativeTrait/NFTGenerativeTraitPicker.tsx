import { Text, useTheme } from '@chakra-ui/react';
import { NFTGenerativeItemClass } from '@owlprotocol/nft-sdk';
import { NFTGenerativeTraitColorPicker } from './NFTGenerativeTraitColorPicker.js';
import { NFTGenerativeTraitColormapPicker } from './NFTGenerativeTraitColormapPicker.js';
import { NFTGenerativeTraitEnumPicker } from './NFTGenerativeTraitEnumPicker.js';
import { NFTGenerativeTraitImagePicker } from './NFTGenerativeTraitImagePicker.js';
import { NFTGenerativeTraitNumberPicker } from './NFTGenerativeTraitNumberPicker.js';

export interface NFTGenerativeTraitPickerProps {
    item: NFTGenerativeItemClass;
    name: string;
    setValue?: (value: string | number) => any;
}

/**
 * Picker NFTGenerativeTrait with correct component depending on type of trait
 * @param props
 * @returns Picker component
 */
export const NFTGenerativeTraitPicker = ({
    item,
    name,
    setValue = (value: string | number) => console.debug(`Selected ${value}`),
}: NFTGenerativeTraitPickerProps) => {
    const { themes } = useTheme();
    const t = item.collection.traits[name];

    const SectionTitle = ({ name }: any) => (
        <Text textTransform={'capitalize'} my={6} fontWeight={600} color={themes.color9}>
            Select {name}
        </Text>
    );

    if (t.type === 'color') {
        return (
            <>
                <SectionTitle name={name} />
                <NFTGenerativeTraitColorPicker
                    key={name}
                    item={item}
                    name={name}
                    setValue={(value: any) => setValue(value)}
                />
            </>
        );
    } else if (t.type === 'colormap') {
        return (
            <>
                <SectionTitle name={name} />
                <NFTGenerativeTraitColormapPicker
                    key={name}
                    item={item}
                    name={name}
                    setValue={(value: any) => setValue(value)}
                />
            </>
        );
    } else if (t.type === 'enum') {
        return (
            <>
                <SectionTitle name={name} />
                <NFTGenerativeTraitEnumPicker
                    key={name}
                    item={item}
                    name={name}
                    setValue={(value: any) => setValue(value)}
                />
            </>
        );
    } else if (t.type === 'image') {
        return (
            <>
                <SectionTitle name={name} />
                <NFTGenerativeTraitImagePicker
                    key={name}
                    item={item}
                    name={name}
                    setValue={(value: any) => setValue(value)}
                />
            </>
        );
    } else if (t.type === 'number') {
        return (
            <>
                <SectionTitle name={name} />
                <NFTGenerativeTraitNumberPicker
                    key={name}
                    item={item}
                    name={name}
                    setValue={(value: any) => setValue(value)}
                />
            </>
        );
    } else {
        throw Error(`Trait ${name} not found!`);
    }
};
