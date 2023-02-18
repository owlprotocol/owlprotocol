import { interfaceIds } from "@owlprotocol/contracts";
import { isEqual, uniq, uniqWith } from "lodash-es";
import { call, put } from "typed-redux-saga";
import ContractCRUD from "../../contract/crud.js";
import { EthCallCRUD } from "../crud.js";

//Handle contract creation
export function* dbCreatingSaga(action: ReturnType<typeof EthCallCRUD.actions.dbCreating>): Generator<
    any,
    any
> {

    /*
    const { payload } = action
    const { obj } = payload
    const { networkId, to, methodName, args, returnValue } = obj
    if (methodName === 'supportsInterface' && returnValue) {
        const interfaceId = args![0]
        yield* call(handleSupportsInterface, networkId, to, interfaceId)
    }
    */
}

export function* dbUpdatingSaga(action: ReturnType<typeof EthCallCRUD.actions.dbUpdating>): Generator<
    any,
    any
> {
    /*
    const { payload } = action
    const { obj, mods } = payload
    const { networkId, to, methodName, args } = obj
    const { returnValue } = mods;
    if (methodName === 'supportsInterface' && returnValue) {
        const interfaceId = args![0]
        yield* call(handleSupportsInterface, networkId, to, interfaceId)
    }
    */
}


//Handle contract creation
export function* dbDeletingSaga(action: ReturnType<typeof EthCallCRUD.actions.dbDeleting>): Generator<
    any,
    any
> {

}


export function* handleSupportsInterface(networkId: string, address: string, interfaceId: string) {
    const contract = yield* call(ContractCRUD.db.get, { networkId, address })
    const abi = uniqWith([...(contract?.abi ?? []), ...interfaceIds[interfaceId]], isEqual)
    if (!isEqual(abi, contract?.abi)) {
        yield* put(ContractCRUD.actions.upsert({ networkId, address, abi }))
    }
}
