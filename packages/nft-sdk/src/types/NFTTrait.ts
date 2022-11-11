export type NFTTraitDisplayType = 'number' | 'boost_number' | 'boost_percentage' | 'date';

/** NFTTrait Interface describing an asset's attribute */
export interface NFTTrait {
    /** Name of attribute */
    readonly name: string;
    readonly value: string;
    readonly description?: string;
    readonly max_value?: number;
    readonly display_type?: NFTTraitDisplayType;
}
