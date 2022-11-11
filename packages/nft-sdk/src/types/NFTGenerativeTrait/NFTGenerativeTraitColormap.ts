import { NFTGenerativeTraitBase } from './NFTGenerativeTraitBase.js';
import { RGB } from '../RGB.js';

/** NFTGenerativeTraitColormapOption lists possible values for the generative attribute */
export interface NFTGenerativeTraitColormapOption {
    /** Value */
    readonly value: string;
    /** 256 length RGB color array */
    readonly colors?: RGB[];
}

/** NFTGenerativeTraitColormap describes a generative attribute for picking a color palette */
export interface NFTGenerativeTraitColormap extends NFTGenerativeTraitBase {
    /** Trait Abi */
    readonly abi?: 'uint8' | 'uint16';
    readonly type: 'colormap';
    /** Generative attribute value options */
    readonly options: NFTGenerativeTraitColormapOption[];
}

export function isNFTGenerativeTraitColormap(
    attribute: NFTGenerativeTraitBase,
): attribute is NFTGenerativeTraitColormap {
    return attribute.type === 'colormap';
}
