import { useEffect, useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { ReduxError } from '@owlprotocol/crud-redux';
import { isEmpty, isUndefined } from 'lodash-es';

import { BaseWeb3Contract } from '../model/index.js';
import { ContractEvent } from '../../contractevent/model/index.js';
import { useEventsFiltered } from '../../contractevent/hooks/useEventsFiltered.js';
import { EventGetPastActionInput, eventGetPastAction } from '../../contracteventquery/actions/eventGetPast.js';
import { eventSubscribeAction, eventUnSubscribeAction } from '../../contracteventsubscribe/actions/eventSubscribe.js';

//Contract Events
/** @internal */
export interface UseEventsOptions {
    fromBlock?: EventGetPastActionInput['fromBlock'];
    toBlock?: EventGetPastActionInput['toBlock'];
    blocks?: EventGetPastActionInput['blocks'];
    past?: boolean; //Send event get past action
    sync?: boolean; //Send event subscribe action
    //Hook params
    reverse?: boolean;
    offset?: number;
    limit?: number;
}
/**
 * Fetch and sync contract events. Return list of events with optional filter.
 * @category Hooks
 */
export function useEvents<
    T extends BaseWeb3Contract = BaseWeb3Contract,
    K extends keyof T['events'] = string,
    U extends Record<string, any> = Record<string, any>,
>(
    networkId: string | undefined,
    address: string | undefined,
    eventName: K | undefined,
    filter?: Partial<U>,
    options?: UseEventsOptions,
) {
    const { fromBlock, toBlock, past, sync } = options ?? {};
    const blocks = options?.blocks ?? 10000000;
    const reverse = options?.reverse ?? true;
    const offset = options?.offset ?? 0;
    const limit = options?.limit ?? 20;

    const dispatch = useDispatch();

    //TODO: handle filter
    const [events] = useEventsFiltered(networkId, address, eventName as string,
        filter, { reverse, offset, limit }
    ) as [ContractEvent<U>[] | undefined, any];

    const filterHash = isUndefined(filter) || isEmpty(filter) ? '' : JSON.stringify(filter)

    //Actions
    const getPastAction = useMemo(() => {
        if (networkId && address && eventName) {
            return eventGetPastAction({
                networkId,
                address,
                eventName: eventName as string,
                filter,
                fromBlock,
                toBlock,
                blocks,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [networkId, address, eventName, filterHash, fromBlock, toBlock, blocks]);

    const subscribeAction = useMemo(() => {
        if (networkId && address && eventName) {
            return eventSubscribeAction({
                networkId,
                address,
                eventName: eventName as string,
                filter,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [networkId, address, eventName, filterHash]);

    const unsubscribeAction = useMemo(() => {
        if (networkId && address && eventName) {
            return eventUnSubscribeAction({
                networkId,
                address,
                eventName: eventName as string,
                filter,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [networkId, address, eventName, filterHash]);

    //Callbacks
    const dispatchGetPastAction = useCallback(() => {
        if (getPastAction) dispatch(getPastAction);
    }, [dispatch, getPastAction]);
    const dispatchSubscribeAction = useCallback(() => {
        if (subscribeAction) dispatch(subscribeAction);
    }, [dispatch, subscribeAction]);
    const dispatchUnsubscribeAction = useCallback(() => {
        if (unsubscribeAction) dispatch(unsubscribeAction);
    }, [dispatch, unsubscribeAction]);

    //Effects
    useEffect(() => {
        if (past) dispatchGetPastAction();
    }, [dispatchGetPastAction, past]);

    useEffect(() => {
        if (sync) {
            dispatchSubscribeAction();
            return dispatchUnsubscribeAction;
        }
    }, [dispatchSubscribeAction, dispatchUnsubscribeAction, sync]);

    //Error
    const [getPastError] = ReduxError.hooks.useGet(getPastAction?.meta.uuid);
    const [subscribeError] = ReduxError.hooks.useGet(subscribeAction?.meta.uuid);
    const [unsubscribeError] = ReduxError.hooks.useGet(unsubscribeAction?.meta.uuid);

    const error = useMemo(() => {
        if (!networkId) return new Error('networkId undefined');
        else if (!address) return new Error('address undefined');
        else if (!eventName) return new Error('eventName undefined');
        else if (!!getPastError) return getPastError
        else if (!!subscribeError) return subscribeError;
        else if (!!unsubscribeError) return unsubscribeError;
    }, [networkId, address]);

    //Return
    const returnOptions = { error };
    return [events, returnOptions] as [typeof events, typeof returnOptions];
}

/** @category Hooks */
export function contractEventsHookFactory<
    T extends BaseWeb3Contract = BaseWeb3Contract,
    K extends keyof T['events'] = string,
    U extends Record<string, any> = Record<string, any>,
>(eventName: K) {
    return (
        networkId: string | undefined,
        address: string | undefined,
        filter?: Partial<U>,
        options?: UseEventsOptions,
    ) => {
        return useEvents<T, K, U>(networkId, address, eventName, filter, options);
    };
}

export default useEvents;
