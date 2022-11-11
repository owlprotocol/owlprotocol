import { put, call } from 'typed-redux-saga';
import { ContractInterfaceCRUD } from '../crud.js';
import { ContractInterface } from '../model/interface.js';
import { interfaceIds } from '@owlprotocol/contracts';

/** @category Sagas */
export function* fetchSaga(action: ReturnType<typeof ContractInterfaceCRUD.actions.fetch>): Generator<
    any,
    {
        contractInterface: ContractInterface;
    }
> {
    const { payload } = action;
    const { interfaceId, abi, maxCacheAge } = payload;

    const dbSelected = yield* call(ContractInterfaceCRUD.db.get, { interfaceId });
    if (dbSelected?.updatedAt && Date.now() - dbSelected.updatedAt < maxCacheAge) {
        return { contractInterface: dbSelected }
    }

    //Defined abi
    if (abi) {
        const contractInterface = { interfaceId, abi }
        yield* put(ContractInterfaceCRUD.actions.put(contractInterface, action.meta.uuid));
        return { contractInterface: contractInterface }
    }

    //Default abi
    if (interfaceIds[interfaceId]) {
        const contractInterface = { interfaceId, abi }
        yield* put(ContractInterfaceCRUD.actions.put(contractInterface, action.meta.uuid));
        return { contractInterface: contractInterface }
    }

    //TODO: Use API
    throw new Error(`Unknown interfaceId ${interfaceId}`)
}
