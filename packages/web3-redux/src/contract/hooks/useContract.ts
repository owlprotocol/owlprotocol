import { Contract } from '../model/index.js';
import { ContractCRUD } from '../crud.js';

/**
 * Creates a contract/EOA if it doesn't exist.
 * @category Hooks
 *
 */
export function useContract(
    networkId: string | undefined,
    address: string | undefined,
    defaultContract?: Partial<Contract>,
    maxCacheAge: number = Number.MAX_SAFE_INTEGER
) {
    return ContractCRUD.hooks.useFetch({ networkId, address }, defaultContract, maxCacheAge, true)
}

/** @category Hooks */
export function contractHookFactory(createData: Contract) {
    return (networkId: string | undefined, address: string | undefined) => {
        return useContract(networkId, address, createData);
    };
}
