/** Id components for Block */
export interface EthBlockId {
    /** Blockchain network id. See [chainlist](https://chainlist.org/) for a list of networks. */
    readonly networkId: string;
    /** Block number */
    readonly number: number;
}
