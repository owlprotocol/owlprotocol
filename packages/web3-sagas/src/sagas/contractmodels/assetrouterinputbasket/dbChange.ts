import { interfaces } from "@owlprotocol/contracts";
import { utils } from "ethers";
import { call, put } from "typed-redux-saga";
import { ContractActionHelpers, AssetRouterInputBasketCRUDActions } from "@owlprotocol/web3-actions";
import { EthCall, EthCallDexie } from "@owlprotocol/web3-dexie";
import { validateIdPartialEthCall } from "@owlprotocol/web3-models";

//Handle contract creation
export function* dbCreatingSaga(
    action: ReturnType<typeof AssetRouterInputBasketCRUDActions.actions.dbCreating>,
): Generator<any, any> {
    const { payload } = action;
    const { networkId, address, basketId } = payload.obj;

    const ethCall = (yield* call(
        EthCallDexie.get,
        validateIdPartialEthCall({
            networkId,
            to: address,
            methodFormatFull: interfaces.IAssetRouterInput.interface.functions["getInputBasket(uint256)"]
                .format(utils.FormatTypes.full)
                .replace("function ", ""),
            args: [basketId],
        }),
    )) as EthCall | undefined;
    if (!ethCall) {
        yield* put(
            ContractActionHelpers.IAssetRouterInput.getInputBasket({
                networkId,
                to: address,
                args: [basketId],
            }),
        );
    }
}

/*
export function* dbUpdatingSaga(
    action: ReturnType<typeof AssetRouterInputBasketCRUDActions.actions.dbUpdating>,
): Generator<any, any> { }

//Handle contract creation
export function* dbDeletingSaga(
    action: ReturnType<typeof AssetRouterInputBasketCRUDActions.actions.dbDeleting>,
): Generator<any, any> { }
*/
