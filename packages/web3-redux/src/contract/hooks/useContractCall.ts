import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { Await } from '../../types/promise.js';

import { BaseWeb3Contract, Contract, ContractWithObjects } from '../model/index.js';
import { call } from '../actions/index.js';
import { EthCallCRUD } from '../../ethcall/crud.js';
import { ReduxError } from '@owlprotocol/crud-redux';
import { useContract } from './useContract.js';
import { createSyncForActions, GenericSync } from '../../sync/model/index.js';
import { SyncCRUD } from '../../sync/crud.js';

//Contract Call
/**
 * Create a contract call and return value.
 * @category Hooks
 */
export function useContractCall<
    T extends BaseWeb3Contract = BaseWeb3Contract,
    K extends keyof T['methods'] = string,
    P extends Partial<Parameters<T['methods'][K]>> = any,
>(
    networkId: string | undefined,
    address2: string | undefined,
    method: K | undefined,
    args?: P,
    defaultContract?: Partial<Contract> | undefined,
    maxCacheAge = 1000, //1s
    sync?: GenericSync,
) {
    const dispatch = useDispatch();

    const address = address2?.toLowerCase();
    const [contract] = useContract(networkId, address, defaultContract)

    const web3Contract = (contract as ContractWithObjects | undefined)?.web3Contract;
    const web3ContractExists = !!web3Contract;

    const [ethCall, { isLoading: ethCallLoading }] = EthCallCRUD.hooks.useGet({
        networkId,
        to: address,
        methodName: method as string,
        argsHash: JSON.stringify(args ?? []),
    });
    const returnValue = ethCall?.returnValue as Await<ReturnType<ReturnType<T['methods'][K]>['call']>> | undefined;
    const refresh = !ethCall?.updatedAt || Date.now() - ethCall.updatedAt > maxCacheAge
    const executeCall = web3ContractExists && refresh;

    //Actions
    const argsHash = JSON.stringify(args);
    const syncHash = JSON.stringify(sync);

    const callAction = useMemo(() => {
        if (networkId && address && method) {
            return call({
                networkId,
                address,
                method: method as string,
                args: args as any[],
                maxCacheAge,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [networkId, address, method, argsHash, maxCacheAge]);

    const syncAction = useMemo(() => {
        console.debug({ syncHash })
        if (networkId && address && method && sync) {
            const syncType = typeof sync == 'string' ? sync : (typeof sync == 'number' ? 'Block' : sync.type);
            const id = `${syncType}-${[networkId, address, method, argsHash].join('-')}`

            const syncObj = createSyncForActions(
                id,
                networkId,
                [call({
                    networkId,
                    address,
                    method: method as string,
                    args: args as any[],
                    maxCacheAge: 0,
                })],
                sync,
                address,
            );
            return SyncCRUD.actions.upsert(syncObj);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [networkId, address, method, argsHash, syncHash]);

    //Error
    const [reduxError] = ReduxError.hooks.useGet(callAction?.meta.uuid);
    const error = useMemo(() => {
        if (!networkId) return new Error('networkId undefined');
        else if (!address) return new Error('address undefined');
        else if (!method) return new Error('method undefined');
        else if (!!reduxError) {
            const err = new Error(reduxError.errorMessage);
            err.stack = reduxError.stack;
            return err;
        }
    }, [networkId, address, method, reduxError]);

    //Callback
    const dispatchCallAction = useCallback(() => {
        if (callAction) dispatch(callAction);
    }, [dispatch, callAction]);
    //Effects
    useEffect(() => {
        if (executeCall) dispatchCallAction();
    }, [dispatchCallAction, executeCall]);

    useEffect(() => {
        if (syncAction) {
            dispatch(syncAction);
            return () => {
                dispatch(SyncCRUD.actions.delete({ id: syncAction.payload.id }));
            };
        }
    }, [dispatch, syncAction]);

    const isLoading = ethCallLoading;
    const returnOptions = { error, dispatchCallAction, isLoading, callAction };
    return [returnValue, returnOptions] as [typeof returnValue, typeof returnOptions];
}

export type SyncFn<
    T extends BaseWeb3Contract = BaseWeb3Contract,
    K extends keyof T['methods'] = string,
> = (networkId: string, address: string, args: Partial<Parameters<T['methods'][K]>>) => GenericSync | undefined

/**
 * Factory method for contract call hook
 * @category Hooks
 */
export function contractCallHookFactory<
    T extends BaseWeb3Contract = BaseWeb3Contract,
    K extends keyof T['methods'] = string,
>(method: K, defaultContract: Partial<Contract> | undefined, defaultMaxCacheAge = 0, syncFn?: GenericSync | SyncFn<T, K>) {
    return (
        networkId: string | undefined,
        address: string | undefined,
        args?: Partial<Parameters<T['methods'][K]>>,
        maxCacheAge = defaultMaxCacheAge,
        sync?: GenericSync,
    ) => {
        let syncDefined: GenericSync | undefined
        if (sync) syncDefined = sync;
        else if (typeof syncFn != 'function') syncDefined = syncFn;
        else if (networkId && address && args) syncDefined = syncFn(networkId, address, args)
        return useContractCall<T, K>(networkId, address, method, args, defaultContract, maxCacheAge, syncDefined);
    };
}

export default useContractCall;
