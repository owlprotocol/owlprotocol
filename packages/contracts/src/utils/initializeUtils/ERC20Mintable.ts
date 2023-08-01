import { constants } from "ethers";
import type { ERC20Mintable } from "../../typechain/ethers/contracts/assets/ERC20/ERC20Mintable.js";

export interface ERC20MintableInitializeArgs {
    admin: Parameters<ERC20Mintable["initialize"]>[0];
    contractUri?: Parameters<ERC20Mintable["initialize"]>[1];
    gsnForwarder?: Parameters<ERC20Mintable["initialize"]>[2];
    name: Parameters<ERC20Mintable["initialize"]>[3];
    symbol: Parameters<ERC20Mintable["initialize"]>[4];
}

export function initializeUtil(args: ERC20MintableInitializeArgs) {
    const { admin, contractUri, gsnForwarder, name, symbol } = args;
    return [admin, contractUri ?? "", gsnForwarder ?? constants.AddressZero, name, symbol] as [
        Parameters<ERC20Mintable["initialize"]>[0],
        Parameters<ERC20Mintable["initialize"]>[1],
        Parameters<ERC20Mintable["initialize"]>[2],
        Parameters<ERC20Mintable["initialize"]>[3],
        Parameters<ERC20Mintable["initialize"]>[4],
    ];
}
