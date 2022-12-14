import { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BaseWeb3Contract } from '../model/index.js';
import { send, SendAction } from '../actions/index.js';
import { ContractSend } from '../../contractsend/model/interface.js';
import { ReduxError } from '@owlprotocol/crud-redux';
import ContractSendCRUD from '../../contractsend/crud.js';

/**
 * useContractSend options
 * @internal
 */
export interface UseContractSendOptions {
    value?: string;
    from?: string;
}

/**
 * Create a contract send transaction callback method.
 * @category Hooks
 */
export function useContractSend<T extends BaseWeb3Contract = BaseWeb3Contract, K extends keyof T['methods'] = string>(
    networkId: string | undefined,
    address: string | undefined,
    method: K | undefined,
    args?: Parameters<T['methods'][K]>,
    options?: UseContractSendOptions,
): [
        () => void,
        {
            sendAction: SendAction | undefined;
            error: Error | undefined;
            contractSend: ContractSend | undefined;
        },
    ] {
    const { value, from } = options ?? {};
    const dispatch = useDispatch();
    const [sendAction, setSendAction] = useState<SendAction | undefined>();

    const sendCallback = useCallback(() => {
        if (networkId && address) {
            const sendAction = send({
                networkId,
                address,
                method: method as string,
                args,
                value,
                from,
            });
            setSendAction(sendAction);
            dispatch(sendAction);
        }
    }, [networkId, address, method, JSON.stringify(args), value, args, from, dispatch]);

    const [reduxError] = ReduxError.hooks.useGet(sendAction?.meta.uuid);
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

    const [contractSend] = ContractSendCRUD.hooks.useGet(sendAction?.meta.uuid);
    return [sendCallback, { error, sendAction, contractSend }];
}

/** @category Hooks */
export function contractSendHookFactory<
    T extends BaseWeb3Contract = BaseWeb3Contract,
    K extends keyof T['methods'] = string,
>(method: K) {
    return (networkId: string | undefined, address: string | undefined) => {
        return useContractSend<T, K>(networkId, address, method);
    };
}

export default useContractSend;
