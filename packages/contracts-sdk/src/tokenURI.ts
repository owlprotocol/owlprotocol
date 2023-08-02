import { UnsignedTransaction, providers } from "ethers";

export enum TokenURIContractType {
    TokenURI = "TokenURI",
    TokenURIBaseURI = "TokenURIBaseURI",
    TokenURIDna = "TokenURIDna"
}
export interface DeployTokenURIContractArgs {
    /** Admin address */
    readonly admin: string,
    /** TokenURI Contract Type defaults to the following
     * 1. infer from existing config
     * 2. infer from uri format
     *    2.1 example.com/{id} => TokenURI
     *    2.2 example.com/     => TokenURIBaseURI
     **/
    readonly tokenURIContractType?: TokenURIContractType,
    /** Token URI used for configuration */
    readonly tokenURI: string,
    /** TokenDNA contract address (for TokenURIDna) */
    readonly dnaContractAddress?: string,
    /** NFT contract to configure */
    readonly nftContractAddress?: string,
}
export async function deployTokenURIContract(provider: providers.Provider,
    {
        admin,
    }: DeployTokenURIContractArgs): Promise<UnsignedTransaction[]> {

    throw new Error("Unimplemented")

    return []
}
