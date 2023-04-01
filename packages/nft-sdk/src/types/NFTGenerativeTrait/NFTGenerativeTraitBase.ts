/** NFTGenerativeTraitDisplayType describes how an attribute is displayed */
export type NFTGenerativeTraitDisplayType = 'number' | 'boost_number' | 'boost_percentage' | 'date';

/** NFTGenerativeTrait Interface describing a generative attribute */
export interface NFTGenerativeTraitBase {
    /** Name of attribute */
    readonly name: string;
    /** Type */
    readonly type: string;
    /** Display type */
    readonly display_type?: NFTGenerativeTraitDisplayType;
    /** Attribute description */
    readonly description?: string;
    /** Trait Abi, default is uint8 */
    readonly abi?:
        | 'uint8'
        | 'uint16'
        | 'uint24'
        | 'uint32'
        | 'uint48'
        | 'uint64'
        | 'uint96'
        | 'uint128'
        | 'uint160'
        | 'uint192'
        | 'uint256'
        | 'int8'
        | 'int16'
        | 'int24'
        | 'int32'
        | 'int48'
        | 'int64'
        | 'int96'
        | 'int128'
        | 'int160'
        | 'int192'
        | 'int256';
}
