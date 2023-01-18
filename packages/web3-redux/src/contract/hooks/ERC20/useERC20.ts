import { useMemo } from 'react';
import * as Contracts from '@owlprotocol/contracts';
import useERC20Transfer from './useERC20Transfer.js';
import useERC20Approval from './useERC20Approval.js';
import { UseEventsOptions } from '../useEvents.js';
import { useContractCall } from '../useContractCall.js';

import { GenericSync } from '../../../sync/model/index.js';
import { createEventSync } from '../../../sync/model/EventSync.js';
import { useContract } from '../useContract.js';
import { useERC20BalanceOf, useERC20Decimals, useERC20Name, useERC20Symbol, useERC20TotalSupply } from './hooks.js';

/**
 * Contract hook for ERC20 interface.
 * Will automatically set ABI if not set already.
 * @category Hooks
 *
 */
export function useERC20(
    networkId: string | undefined,
    address: string | undefined,
    balanceOfAddress: string | undefined,
    sync?: {
        TransferEventsOptions?: UseEventsOptions;
        ApprovalEventsOptions?: UseEventsOptions;
    },
) {
    //Create abi in store if non-existant
    useContract(networkId, address, { abi: Contracts.Artifacts.IERC20Metadata.abi });

    //Default sync params
    //Refresh call action will get set by the callSyncedAction() creator, we pass an empty array as an argument
    //We also disable sync if networkId/address undefined to avoid unpredictable behaviour

    //Static values
    const [name] = useERC20Name(networkId, address)
    const [symbol] = useERC20Symbol(networkId, address)
    const [decimals] = useERC20Decimals(networkId, address)
    const [totalSupply] = useERC20TotalSupply(networkId, address)

    //if balanceOf is 'Transfer' we disable hook sync and dispatch our own custom solution
    const [balanceOf] = useERC20BalanceOf(networkId, address, [balanceOfAddress]);

    //Events
    const TransferEventsOptions = sync?.TransferEventsOptions ?? { sync: false, past: false }; //Sync token Transfer events, default just reads data
    const ApprovalEventsOptions = sync?.ApprovalEventsOptions ?? { sync: false, past: false }; //Sync token Approval events, default just reads data
    const [TransferFrom] = useERC20Transfer(networkId, address, { from: balanceOfAddress }, TransferEventsOptions);
    const [TransferTo] = useERC20Transfer(networkId, address, { to: balanceOfAddress }, TransferEventsOptions);
    const [ApprovalOwner] = useERC20Approval(networkId, address, { owner: balanceOfAddress }, ApprovalEventsOptions);
    const [ApprovalSpender] = useERC20Approval(
        networkId,
        address,
        { spender: balanceOfAddress },
        ApprovalEventsOptions,
    );

    const values = useMemo(() => {
        return {
            name,
            symbol,
            decimals,
            totalSupply,
            balanceOf,
            TransferFrom,
            TransferTo,
            ApprovalOwner,
            ApprovalSpender,
        };
    }, [name, symbol, decimals, totalSupply, balanceOf, TransferFrom, TransferTo, ApprovalOwner, ApprovalSpender]);

    return values;
}

/**
 * Alias for useERC20.
 * @category Hooks
 *
 */
export const useToken = useERC20;

export default useERC20;
