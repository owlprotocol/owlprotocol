import { NFTGenerativeTraitBase } from './NFTGenerativeTraitBase.js';

/** NFTGenerativeTraitEnumOption lists possible values for the generative attribute */
export type NFTGenerativeTraitEnumOption = string;
/** NFTGenerativeTraitEnum describes a generative attribute from a set of choices */
export interface NFTGenerativeTraitEnum extends NFTGenerativeTraitBase {
    /** Trait Abi */
    readonly abi?:
        | 'uint8'
        | 'uint16'
        | 'uint24'
        | 'uint32'
        | 'uint48'
        | 'uint64'
        | 'uint96'
        | 'uint128'
        | 'uint196'
        | 'uint256'
        | 'int8'
        | 'int16'
        | 'int24'
        | 'int32'
        | 'int48'
        | 'int64'
        | 'int96'
        | 'int128'
        | 'int196'
        | 'int256';
    /** This is what the data encodes. Usually, will refer to items in options array */
    readonly type: 'enum';
    /** Generative attribute value options */
    readonly options: NFTGenerativeTraitEnumOption[];
    /** Probabilities of each option. Normalized when validating trait. Must have the same length as `options` **/
    probabilities?: number[];
}

export function isNFTGenerativeTraitEnum(attribute: NFTGenerativeTraitBase): attribute is NFTGenerativeTraitEnum {
    return attribute.type === 'enum';
}
