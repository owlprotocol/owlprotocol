import { put, call } from 'typed-redux-saga';
import { ContractInterfaceCRUD } from '../crud.js';
import { ContractInterface } from '../model/interface.js';
import { interfaceIds } from '@owlprotocol/contracts';
import { compact, filter, map, zip } from 'lodash-es';

/** @category Sagas */
export function* fetchBatchSaga(action: ReturnType<typeof ContractInterfaceCRUD.actions.fetchBatch>): Generator<
    any,
    {
        contractInterfaces: ContractInterface[];
    }
> {
    const { payload } = action;
    const dbSelectedBatch = yield* call(ContractInterfaceCRUD.db.bulkGet, map(payload, 'interfaceId'));

    const results = map(zip(payload, dbSelectedBatch), ([payload, dbSelected]) => {
        const { interfaceId, abi, maxCacheAge } = payload!
        if (dbSelected?.updatedAt && Date.now() - dbSelected.updatedAt < maxCacheAge) {
            return { insert: false, contractInterface: dbSelected }
        }

        //Defined abi
        if (abi) {
            const contractInterface = { interfaceId, abi }
            return { insert: true, contractInterface: contractInterface }
        }

        //Default abi
        if (interfaceIds[interfaceId]) {
            const contractInterface = { interfaceId, abi }
            return { insert: true, contractInterface: contractInterface }
        }

        return undefined
    })


    const resultsPut = results.filter((r) => r?.insert).map((r) => r?.contractInterface) as ContractInterface[]
    yield put(ContractInterfaceCRUD.actions.putBatched(resultsPut))

    const contractInterfaces = compact(results.map((r) => r?.contractInterface))
    return { contractInterfaces }
}
