/**
 * - Check ERC1820 Registry
 * - Check common ERC165
 * - Check etherscan
 */

import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { ContractCRUD } from '../../contract/crud.js';
import { setInterfaceImplementers } from '../actions/setInterfaceImplementers.js';

/**
 * Set Contract ABI using ERC1820 registry
 * @category Hooks
 *
 */
export function useSetInterfaceImplementers(networkId: string | undefined, address: string | undefined) {
    const dispatch = useDispatch();

    const contract = ContractCRUD.hooks.useSelectByIdSingle({ networkId, address });
    const contractExists = !!contract;
    const abiExists = !!contract?.abi;

    //Fetch abi (Etherscan)
    const setInterfaceImplementersAction = useMemo(() => {
        if (networkId && address && contractExists && !abiExists) {
            return setInterfaceImplementers({ networkId, address });
        }
    }, [networkId, address, contractExists, abiExists]);

    useEffect(() => {
        if (setInterfaceImplementersAction) dispatch(setInterfaceImplementersAction);
    }, [dispatch, setInterfaceImplementersAction]);

    return [contract];
}
