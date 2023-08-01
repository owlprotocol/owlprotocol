import { call, put } from "typed-redux-saga";
import { ContractCRUDActions } from "@owlprotocol/web3-actions";
import { Contract } from "@owlprotocol/web3-models";
import { inferInterfaceAction } from "@owlprotocol/web3-actions";
import { ContractDexie } from "@owlprotocol/web3-dexie";

export function* dbCreatingSaga(
    action: ReturnType<typeof ContractCRUDActions.actions.dbCreating>,
): Generator<any, any> {
    const { payload } = action;
    const { obj } = payload;
    const { networkId, address, interfaceCheckedAt } = obj;

    if (!interfaceCheckedAt) {
        //Interface not inferred yet
        yield* put(inferInterfaceAction({ networkId, address }));
    }
}

export function* dbUpdatingSaga(
    action: ReturnType<typeof ContractCRUDActions.actions.dbUpdating>,
): Generator<any, any> {
    const { payload } = action;
    const { obj, mods } = payload;
    const { networkId, address } = obj;
    const interfaceCheckedAt = mods.interfaceCheckedAt ?? obj.interfaceCheckedAt;

    if (!interfaceCheckedAt) {
        //Interface not inferred yet
        yield* put(inferInterfaceAction({ networkId, address }));
    }
}

export function* dbDeletingSaga(
    action: ReturnType<typeof ContractCRUDActions.actions.dbDeleting>,
): Generator<any, any> {
    const { payload } = action;
    if (payload.obj) {
        const { networkId, address } = payload.obj;
        yield* put(ContractCRUDActions.actions.reduxDelete({ networkId, address }));
    }
}

export function* createContractIfNull(networkId: string, address: string): Generator<any, Contract | undefined> {
    const contract = yield* call(ContractDexie.get, {
        networkId,
        address: address,
    });
    if (!contract) {
        //Create contract if not exists
        yield* put(ContractCRUDActions.actions.create({ networkId, address }));
    }

    return contract;
}
