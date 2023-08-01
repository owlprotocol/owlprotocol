import { UnsignedTransaction, providers } from "ethers";

export enum TokenMinterContractType {
    ERC721Minter = "ERC721Minter",
    ERC721MinterAutoId = "ERC721MinterAutoId",
    ERC721MinterDNA = "ERC721MinterDNA",
    ERC721MinterAutoIdDNA = "ERC721MinterAutoIdDNA",
}

export interface DeployTokenMinterContractArgs {
    /** Admin address */
    readonly admin: string
    /** TokenMinter Contract Type (default: ERC2981) */
    readonly tokenMinterContractType?: TokenMinterContractType
    /** NFT Contract to configure */
    readonly nftContractAddress?: string,
}

export async function deployTokenMinterContract(provider: providers.Provider, {
    admin,
    tokenMinterContractType,
    nftContractAddress,
}: DeployTokenMinterContractArgs): Promise<UnsignedTransaction[]> {

    throw new Error("Unimplemented")

    return []
}
