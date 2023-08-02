import { constants } from "ethers";
import type { ERC2981Setter } from "../../typechain/ethers/contracts/plugins/ERC2981/ERC2981Setter.js";

export interface ERC2981SetterInitializeArgs {
    admin: Parameters<ERC2981Setter["initialize"]>[0];
    contractUri?: Parameters<ERC2981Setter["initialize"]>[1];
    royaltyRole?: Parameters<ERC2981Setter["initialize"]>[2];
    royaltyReceiver?: Parameters<ERC2981Setter["initialize"]>[3];
    feeNumerator?: Parameters<ERC2981Setter["initialize"]>[4];
}

export function initializeUtil(args: ERC2981SetterInitializeArgs) {
    const { admin, contractUri, royaltyRole, royaltyReceiver, feeNumerator } = args;
    return [
        admin,
        contractUri ?? "",
        royaltyRole ?? admin,
        royaltyReceiver ?? admin,
        feeNumerator ?? constants.Zero,
    ] as [
            Parameters<ERC2981Setter["initialize"]>[0],
            Parameters<ERC2981Setter["initialize"]>[1],
            Parameters<ERC2981Setter["initialize"]>[2],
            Parameters<ERC2981Setter["initialize"]>[3],
            Parameters<ERC2981Setter["initialize"]>[4],
        ];
}
