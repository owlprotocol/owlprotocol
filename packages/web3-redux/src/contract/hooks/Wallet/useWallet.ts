import { BigNumberish } from 'ethers'

import { useERC1155WithBalance } from "./useERC1155WithBalance.js";
import { useERC20WithBalance } from "./useERC20WithBalance.js";
import { useERC721Owned } from "./useERC721Owned.js";

export function useWallet(account: string, networkIds?: string[] | undefined, minBalance: BigNumberish = 0) {
    const ERC20 = useERC20WithBalance(account, networkIds, minBalance)
    const ERC721 = useERC721Owned(account, networkIds)
    const ERC1155 = useERC1155WithBalance(account, networkIds, minBalance)

    return {
        ERC20,
        ERC721,
        ERC1155
    }
}
