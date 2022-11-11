import { NFTGenerativeTraitBase } from './NFTGenerativeTraitBase.js';

export type NFTGenerativeTraitNumberOption = number;

/** NFTGenerativeTraitNumber describes a generative attribute from a continuous range */
export interface NFTGenerativeTraitNumber extends NFTGenerativeTraitBase {
    readonly type: 'number';
    /** Generative attribute value range */
    readonly min: number;
    readonly max: number;
}

export function isNFTGenerativeTraitNumber(attribute: NFTGenerativeTraitBase): attribute is NFTGenerativeTraitNumber {
    return attribute.type === 'number';
}
