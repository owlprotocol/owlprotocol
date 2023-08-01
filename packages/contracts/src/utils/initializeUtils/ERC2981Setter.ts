import { constants } from "ethers";
import type { ERC2981Setter } from "../../typechain/ethers/contracts/plugins/ERC2981/ERC2981Setter.js";

export interface ERC2981SetterInitializeArgs {
    admin: Parameters<ERC2981Setter["initialize"]>[0];
    contractUri?: Parameters<ERC2981Setter["initialize"]>[1];
    gsnForwarder?: Parameters<ERC2981Setter["initialize"]>[2];
    royaltyRole?: Parameters<ERC2981Setter["initialize"]>[3];
    royaltyReceiver?: Parameters<ERC2981Setter["initialize"]>[4];
    feeNumerator?: Parameters<ERC2981Setter["initialize"]>[5];
}

export function initializeUtil(args: ERC2981SetterInitializeArgs) {
    const { admin, contractUri, gsnForwarder, royaltyRole, royaltyReceiver, feeNumerator } = args;
    return [
        admin,
        contractUri ?? "",
        gsnForwarder ?? constants.AddressZero,
        royaltyRole ?? admin,
        royaltyReceiver ?? admin,
        feeNumerator ?? constants.Zero,
    ] as [
            Parameters<ERC2981Setter["initialize"]>[0],
            Parameters<ERC2981Setter["initialize"]>[1],
            Parameters<ERC2981Setter["initialize"]>[2],
            Parameters<ERC2981Setter["initialize"]>[3],
            Parameters<ERC2981Setter["initialize"]>[4],
            Parameters<ERC2981Setter["initialize"]>[5],
        ];
}
