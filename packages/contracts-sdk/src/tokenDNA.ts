import { UnsignedTransaction, providers } from "ethers";

export enum TokenDNAContractType {
    TokenDNA = "TokenDNA",
}
export interface DeployTokenDNAContractArgs {
    /** Admin address */
    readonly admin: string,
    /** TokenDNA Contract Type (default: TokenDNA) **/
    readonly tokenDNAContractType?: TokenDNAContractType,
    /** NFT contract or TokenURI contract to configure */
    readonly nftOrTokenURIContractAddress?: string,
}
export async function deployTokenDNAContract(provider: providers.Provider, {
    admin,
}: DeployTokenDNAContractArgs): Promise<UnsignedTransaction[]> {

    throw new Error("Unimplemented")

    return []
}
