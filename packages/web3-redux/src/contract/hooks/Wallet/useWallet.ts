import { BigNumberish } from 'ethers'

import { useERC1155WithBalance } from "./useERC1155WithBalance.js";
import { useERC20WithBalance } from "./useERC20WithBalance.js";
import { useERC721Owned } from "./useERC721Owned.js";

export function useWallet(account: string, networkId?: string, minBalance: BigNumberish = 0) {
    const ERC20 = useERC20WithBalance(account, networkId ? [networkId] : [], minBalance)
    const ERC721 = useERC721Owned(account, networkId)
    const ERC1155 = useERC1155WithBalance(account, networkId, minBalance)

    return {
        ERC20,
        ERC721,
        ERC1155
    }
}
