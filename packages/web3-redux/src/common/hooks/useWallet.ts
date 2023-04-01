import { flatten, isUndefined, omitBy } from "lodash-es";
import { useERC1155Balance } from "../../contractmodels/erc1155balance/hooks/useERC1155Balance.js";
import { useERC20BalanceWhereAnyOf } from "../../contractmodels/erc20balance/hooks/useERC20Balance.js";
import { useERC721WhereAnyOf } from "../../contractmodels/erc721/hooks/useERC721.js";
import { ERC20BalanceIndexInputAnyOf } from "../../contractmodels/erc20balance/model/interface.js";
import { ERC721IndexInputAnyOf } from "../../contractmodels/erc721/model/interface.js";
import { ERC1155BalanceIndexInputAnyOf } from "../../contractmodels/erc1155balance/model/interface.js";

export function useWallet(
    account: string[] | string | undefined,
    networkId?: string[] | string | undefined,
    minBalance?: string | undefined,
) {
    const ERC20 = useERC20BalanceWhereAnyOf(
        account ? (omitBy({ networkId, account }, isUndefined) as ERC20BalanceIndexInputAnyOf) : undefined,
        minBalance,
    );
    const ERC721 = useERC721WhereAnyOf(
        account ? (omitBy({ networkId, owner: account }, isUndefined) as ERC721IndexInputAnyOf) : undefined,
    );
    const ERC1155 = useERC1155Balance(
        account ? (omitBy({ networkId, account }, isUndefined) as ERC1155BalanceIndexInputAnyOf) : undefined,
        minBalance,
    );

    return {
        ERC20: flatten(ERC20[0]),
        ERC721: flatten(ERC721[0]),
        ERC1155: flatten(ERC1155[0]),
    };
}
