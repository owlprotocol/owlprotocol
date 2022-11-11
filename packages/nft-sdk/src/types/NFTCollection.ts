/** NFTCollection Interface describing a collection on a marketplace */
export interface NFTCollection {
    /** Collection name */
    readonly name: string;
    /** Collection description */
    readonly description?: string;
    /** Image */
    readonly image?: string;
    /** Allow users to leave marketplace and view the item on your site. */
    readonly external_url?: string;
    /** Indicates a 1/10000 seller fee 100 = 1%. */
    readonly seller_fee_basis_points?: number;
    /** Where seller fees will be paid to. */
    readonly fee_recipient?: string;
}
