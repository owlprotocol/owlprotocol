import { select, put, call } from "typed-redux-saga";
import ENS from "ethereum-ens";
import { GetEnsAction } from "../actions/index.js";
import { ContractCRUD } from "../crud.js";
import { NetworkCRUD } from "../../network/crud.js";

/** @category Sagas */
export function* getEns(action: GetEnsAction) {
    const { payload } = action;
    const { networkId, address } = payload;

    const network = yield* select(NetworkCRUD.selectors.selectByIdSingle, networkId);
    if (!network) throw new Error(`Network ${networkId} undefined`);

    const web3 = network.web3;
    if (!web3) throw new Error(`Network ${networkId} missing web3`);

    const contract = yield* select(ContractCRUD.selectors.selectByIdSingle, { networkId, address });
    if (!contract) yield* put(ContractCRUD.actions.upsert({ networkId, address }));

    const ens = new ENS(web3?.currentProvider);
    const ensName = yield* call(ens.reverse(address).name);

    yield* put(ContractCRUD.actions.update({ networkId, address, ens: ensName as string }));
}
