import { UnsignedTransaction, providers } from "ethers"

export enum NFTContractType {
    ERC721 = "ERC721",
    ERC721AutoId = "ERC721AutoId",
    ERC1155 = "ERC1155"
}

export enum DNAType {
    NONE = "NONE",
    DNA = "DNA",
    DNA_6651 = "DNA_6651"
}

export interface DeployNFTCollectionArgs {
    /** Admin address */
    readonly admin: string
    /** NFT Contract Type (default: ERC721AutoId) */
    readonly contractType?: NFTContractType,
    /** Required for ERC721, for ERC1155 used in creating metadata  */
    readonly name: string,
    readonly symbol: string,
    /** ERC2981 Royalty amount as % */
    readonly royaltyAmount?: number,
    /** ERC2981 Royalty receiver */
    readonly royaltyAddress?: string,
    /** Enable DNA Standard */
    readonly dnaType?: DNAType,
    /** Base URI for metadata */
    readonly baseUri?: string,
    //TODO: Figure out schema logic
    /** Dna Schema, required if using DNA Standard */
    readonly dnaSchema?: any
}

/**
 * Deploys an Owl Protocol NFT and associated contracts (royalty, uri, dna, minter)
 * @returns Array of UnsignedTransaction payloads
 */
export async function deployNFTCollection(provider: providers.Provider, {
    admin,
    contractType,
    name,
    symbol,
    royaltyAmount,
    royaltyAddress,
    dnaType,
    baseUri,
    dnaSchema
}: DeployNFTCollectionArgs): Promise<UnsignedTransaction[]> {

    throw new Error("Unimplemented")

    return []
}


/**
 *
 */
export async function extendNFTCollection() {

}
