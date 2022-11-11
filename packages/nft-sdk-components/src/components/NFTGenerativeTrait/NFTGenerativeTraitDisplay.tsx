import {
    NFTGenerativeItemClass,
    NFTGenerativeTraitColorClass,
    NFTGenerativeTraitColormapClass,
    NFTGenerativeTraitEnumClass,
    NFTGenerativeTraitImageClass,
    NFTGenerativeTraitNumberClass,
} from '@owlprotocol/nft-sdk';
import { NFTGenerativeTraitColorDisplay } from './NFTGenerativeTraitColorDisplay.js';
import { NFTGenerativeTraitColormapDisplay } from './NFTGenerativeTraitColormapDisplay.js';
import { NFTGenerativeTraitEnumDisplay } from './NFTGenerativeTraitEnumDisplay.js';
import { NFTGenerativeTraitImageDisplay } from './NFTGenerativeTraitImageDisplay.js';
import { NFTGenerativeTraitNumberDisplay } from './NFTGenerativeTraitNumberDisplay.js';

export interface NFTGenerativeTraitDisplayProps {
    item: NFTGenerativeItemClass;
    name: string;
}

/**
 * Display NFTGenerativeTrait with correct component depending on type of trait
 * @param props
 * @returns Display component
 */
export const NFTGenerativeTraitDisplay = ({ item, name }: NFTGenerativeTraitDisplayProps) => {
    const t = item.collection.traits[name];

    if (t instanceof NFTGenerativeTraitColorClass) {
        return <NFTGenerativeTraitColorDisplay key={name} item={item} name={name} />;
    } else if (t instanceof NFTGenerativeTraitColormapClass) {
        return <NFTGenerativeTraitColormapDisplay key={name} item={item} name={name} />;
    } else if (t instanceof NFTGenerativeTraitEnumClass) {
        return <NFTGenerativeTraitEnumDisplay key={name} item={item} name={name} />;
    } else if (t instanceof NFTGenerativeTraitImageClass) {
        return <NFTGenerativeTraitImageDisplay key={name} item={item} name={name} />;
    } else if (t instanceof NFTGenerativeTraitNumberClass) {
        return <NFTGenerativeTraitNumberDisplay key={name} item={item} name={name} />;
    } else {
        throw Error(`Trait ${name} not found!`);
    }
};
