import { Signer } from "ethers";
import { factoriesAll } from "@owlprotocol/contracts"
import { DeploymentMethod } from "@owlprotocol/contracts-proxy"

export enum TokenRoyaltyContractType {
    ERC2981 = "ERC2981",
}

export interface DeployContractArgs {
    /** Admin address */
    readonly admin: string
    /** Contract Uri */
    readonly contractUri?: string,
    /** GSN Forwarder */
    readonly gsnForwarder?: string,
}

export interface DeployTokenRoyaltyContractArgs extends DeployContractArgs {
    /** TokenRoyalty Contract Type (default: ERC2981) */
    readonly tokenRoyaltyContractType?: TokenRoyaltyContractType
    /** Custom royalty setter role (default: admin) */
    readonly royaltyRole?: string;
    /** ERC2981 TokenRoyalty receiver */
    readonly royaltyReceiver?: string,
    /** ERC2981 TokenRoyalty amount as % */
    readonly feeNumerator?: number,
    /** NFT Contract to configure */
    readonly nftContractAddress?: string,
}

function example() {
    factoriesAll.ERC2981Setter.deploy({ admin: "" }, { deploymentMethod: DeploymentMethod.BEACON_OWL }, undefined as any as Signer)
    type T = Parameters<typeof factoriesAll.ERC2981Setter.deploy>[0]

    const routes = {
        ERC2981: {
            factory: factoriesAll.ERC2981Setter,
            meta: { openapi: "" },
            zod: {}
        }
    }
}
