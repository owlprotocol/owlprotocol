import { interfaces } from "@owlprotocol/contracts";
import { utils } from "ethers";
import { call, put } from "typed-redux-saga";
import { ContractHelpers } from "../../../common/contracts.js";
import { EthCallCRUD } from "../../../ethmodels/ethcall/crud.js";
import { AssetRouterInputBasketCRUD } from "../crud.js";

//Handle contract creation
export function* dbCreatingSaga(
    action: ReturnType<typeof AssetRouterInputBasketCRUD.actions.dbCreating>,
): Generator<any, any> {
    const { payload } = action;
    const { networkId, address, basketId } = payload.obj;

    const ethCall = yield* call(EthCallCRUD.db.get, {
        networkId,
        to: address,
        methodFormatFull: interfaces.IAssetRouterInput.interface.functions["getInputBasket(uint256)"]
            .format(utils.FormatTypes.full)
            .replace("function ", ""),
        args: [basketId],
    });
    if (!ethCall) {
        yield* put(
            ContractHelpers.IAssetRouterInput.getInputBasket({
                networkId,
                to: address,
                args: [basketId],
            }),
        );
    }
}

/*
export function* dbUpdatingSaga(
    action: ReturnType<typeof AssetRouterInputBasketCRUD.actions.dbUpdating>,
): Generator<any, any> { }

//Handle contract creation
export function* dbDeletingSaga(
    action: ReturnType<typeof AssetRouterInputBasketCRUD.actions.dbDeleting>,
): Generator<any, any> { }
*/
