import { put, call } from "typed-redux-saga";
import { GetChainIdAction } from "@owlprotocol/web3-actions";
import { NetworkCRUDActions } from "@owlprotocol/web3-actions";

export function* getChainId(action: GetChainIdAction) {
    const { payload } = action;
    const web3 = payload;

    const chainId = yield* call(web3.eth.getChainId);
    yield* put(NetworkCRUDActions.actions.upsert({ networkId: `${chainId}` }));
}
