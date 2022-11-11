import { NFTGenerativeItemClass } from '@owlprotocol/nft-sdk';
import { useState } from 'react';
import { NFTGenerativeTraitPicker } from '../NFTGenerativeTrait/NFTGenerativeTraitPicker.js';

export interface NFTGenerativeItemPickerProps {
    item: NFTGenerativeItemClass;
    showItemChildren?: boolean
    setValue?: (key: string, value: string | number) => any;
}

export const NFTGenerativeItemPicker = ({
    item,
    showItemChildren,
    setValue = (key: string, value: string | number) => console.debug(`Selected ${key} ${value}`),
}: NFTGenerativeItemPickerProps) => {
    const traits = item.collection.traits;
    console.debug({ showItemChildren, children: item.children })

    if (!showItemChildren || !item.children) {
        return (
            <>
                {Object.values(traits).map((t) => {
                    return (
                        <NFTGenerativeTraitPicker
                            key={t.name}
                            item={item}
                            name={t.name}
                            setValue={(value: string | number) => setValue(t.name, value)}
                        />
                    );
                })}
            </>
        );
    }

    return <>
        {Object.values(traits).map((t) => {
            return (
                <NFTGenerativeTraitPicker
                    key={t.name}
                    item={item}
                    name={t.name}
                    setValue={(value: string | number) => setValue(t.name, value)}
                />
            );
        })}
        {
            Object.values(item.children).map((c, i) => {
                return <NFTGenerativeItemPicker item={c} />
            })
        }
    </>
};

export const NFTGenerativeItemPickerWithState = ({ item, showItemChildren }: NFTGenerativeItemPickerProps) => {
    const [currItem, setItem] = useState(item);

    return (
        <NFTGenerativeItemPicker
            item={currItem}
            showItemChildren={showItemChildren}
            setValue={(trait: string, value: string | number) => setItem(currItem.withAttribute(trait, value))}
        />
    );
};
