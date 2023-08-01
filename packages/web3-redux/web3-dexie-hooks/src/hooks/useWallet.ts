import { ERC20BalanceDexieHooks } from "../contractmodels/erc20balance.js";
import { ERC721DexieHooks } from "../contractmodels/erc721.js";
import { ERC1155BalanceDexieHooks } from "../contractmodels/erc1155balance.js";

export function useWallet(account: string) {
    const [ERC20] = ERC20BalanceDexieHooks.useWhere({ account });
    const [ERC721] = ERC721DexieHooks.useWhere({ owner: account });
    const [ERC1155] = ERC1155BalanceDexieHooks.useWhere({ account });

    return {
        ERC20,
        ERC721,
        ERC1155,
    };
}
