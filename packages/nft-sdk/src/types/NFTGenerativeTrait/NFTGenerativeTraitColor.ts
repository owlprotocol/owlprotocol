import { NFTGenerativeTraitBase } from './NFTGenerativeTraitBase.js';

export type NFTGenerativeTraitColorOption = number;
/** NFTGenerativeTraitColor describes a generative attribute from a continuous range */
export interface NFTGenerativeTraitColor extends NFTGenerativeTraitBase {
    /** Trait Abi */
    readonly abi?: 'uint8' | 'uint16';
    readonly type: 'color';
    /** Generative attribute value range */
    readonly min?: 0;
    readonly max?: 255;
    /** Colormap attribute reference */
    readonly colormap: string;
}

export function isNFTGenerativeTraitColor(attribute: NFTGenerativeTraitBase): attribute is NFTGenerativeTraitColor {
    return attribute.type === 'color';
}
