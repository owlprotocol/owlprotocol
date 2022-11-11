import { Flex } from '@chakra-ui/react';
import {
    NFTGenerativeItemClass,
    NFTGenerativeTraitImageClass,
    NFTGenerativeTraitImageOption,
} from '@owlprotocol/nft-sdk';
import { NFTGenerativeTraitImageDisplay } from './NFTGenerativeTraitImageDisplay.js';

export interface NFTGenerativeTraitImagePickerProps {
    item: NFTGenerativeItemClass;
    name: string;
    setValue?: (value: string) => any;
}

export const NFTGenerativeTraitImagePicker = ({
    item,
    name,
    setValue = (value: string) => console.debug(`Selected ${value}`),
}: NFTGenerativeTraitImagePickerProps) => {
    const trait = item.collection.traits[name] as NFTGenerativeTraitImageClass;

    //Item with image parameters defined by DNA (eg. color, colormap, stroke_width params)
    const selected = item.attributesFormatted()[name] as unknown as NFTGenerativeTraitImageOption;

    return (
        <Flex>
            {trait.options.map((option) => {
                const newItem = item.withAttribute(name, option.value);

                return (
                    <div key={option.value} onClick={() => setValue(option.value)}>
                        <NFTGenerativeTraitImageDisplay
                            key={option.value}
                            item={newItem}
                            name={name}
                            active={selected.value == option.value}
                        />
                    </div>
                );
            })}
        </Flex>
    );
};
