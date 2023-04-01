import { select, put, call } from "typed-redux-saga";
import ENS from "ethereum-ens";
import { GetEnsAction } from "@owlprotocol/web3-actions";
import { ContractCRUDActions } from "@owlprotocol/web3-actions";
import { NetworkSelectors } from "@owlprotocol/web3-redux-orm";

/** @category Sagas */
export function* getEns(action: GetEnsAction) {
    const { payload } = action;
    const { networkId, address } = payload;

    const network = yield* select(NetworkSelectors.selectByIdSingle, "1");
    if (!network) throw new Error(`Network ${networkId} undefined`);

    const web3 = network.web3;
    if (!web3) throw new Error(`Network ${networkId} missing web3`);

    const ens = new ENS(web3?.currentProvider);
    const ensName = yield* call(ens.reverse(address).name);

    yield* put(ContractCRUDActions.actions.update({ networkId, address, ens: ensName as string }));
}
