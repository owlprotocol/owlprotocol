import { put, call, select } from "typed-redux-saga";
import { GetNonceAction } from "@owlprotocol/web3-actions";
import { ContractCRUDActions } from "@owlprotocol/web3-actions";
import { NetworkSelectors } from "@owlprotocol/web3-redux-orm";
import { ContractDexie } from "@owlprotocol/web3-dexie";

/** @category Sagas */
export function* getNonce(action: GetNonceAction) {
    const { payload } = action;
    const { networkId, address } = payload;

    const contract = yield* call(ContractDexie.get, { networkId, address });

    const network = yield* select(NetworkSelectors.selectByIdSingle, networkId);
    if (!network) throw new Error(`Network ${networkId} undefined`);

    const web3 = network.web3;
    if (!web3) throw new Error(`Network ${networkId} missing web3`);

    //@ts-expect-error
    const nonceStr: string = yield* call([web3, web3.eth.getTransactionCount], address);
    const nonce = parseInt(nonceStr);
    if (nonce != contract?.nonce) {
        yield* put(ContractCRUDActions.actions.upsert({ networkId, address, nonce }, action.meta.uuid));
    }
}
