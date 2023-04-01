import { call, put } from "typed-redux-saga";
import { ContractCRUD } from "../crud.js";
import { Contract } from "../model/interface.js";
import { inferInterfaceAction } from "../../contractmodels/erc165/actions/inferInterface.js";

export function* dbCreatingSaga(action: ReturnType<typeof ContractCRUD.actions.dbCreating>): Generator<any, any> {
    const { payload } = action;
    const { obj } = payload;
    const { networkId, address, interfaceCheckedAt } = obj;

    if (!interfaceCheckedAt) {
        //Interface not inferred yet
        yield* put(inferInterfaceAction({ networkId, address }));
    }
}

export function* dbUpdatingSaga(action: ReturnType<typeof ContractCRUD.actions.dbUpdating>): Generator<any, any> {
    const { payload } = action;
    const { obj, mods } = payload;
    const { networkId, address } = obj;
    const interfaceCheckedAt = mods.interfaceCheckedAt ?? obj.interfaceCheckedAt;

    if (!interfaceCheckedAt) {
        //Interface not inferred yet
        yield* put(inferInterfaceAction({ networkId, address }));
    }
}

export function* dbDeletingSaga(action: ReturnType<typeof ContractCRUD.actions.dbDeleting>): Generator<any, any> {
    const { payload } = action;
    if (payload.obj) {
        const { networkId, address } = payload.obj;
        yield* put(ContractCRUD.actions.reduxDelete({ networkId, address }));
    }
}

export function* createContractIfNull(networkId: string, address: string): Generator<any, Contract | undefined> {
    const contract = yield* call(ContractCRUD.db.get, {
        networkId,
        address: address,
    });
    if (!contract) {
        //Create contract if not exists
        yield* put(ContractCRUD.actions.create({ networkId, address }));
    }

    return contract;
}
