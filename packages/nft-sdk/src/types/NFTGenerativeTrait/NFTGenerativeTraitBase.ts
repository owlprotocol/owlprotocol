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
    readonly abi?: 'uint8' | 'uint16' | 'int8' | 'int16';
}
