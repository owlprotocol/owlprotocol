import { createAction2 } from '@owlprotocol/crud-redux';
import * as Contracts from '@owlprotocol/contracts';
import type { AbiItem } from 'web3-utils';

import { name } from '../common.js';
import { ContractId } from '../model/interface.js';

/** @internal */
export const GET_SUPPORTS_INTERFACE = `${name}/GET_SUPPORTS_INTERFACE`;

export interface GetSupportsInterfaceActionInput extends ContractId {
    intefaceIds?: {
        [interfaceId: string]: AbiItem[] | undefined
    }
}

/** @category Actions */
export const getSupportsInterface = createAction2(GET_SUPPORTS_INTERFACE, (payload: GetSupportsInterfaceActionInput) => {
    const interfaceIds = payload.intefaceIds ?? Contracts.interfaceIds
    return {
        networkId: payload.networkId,
        address: payload.address.toLowerCase(),
        interfaceIds
    }
});

/** @internal */
export type GetSupportsInterfaceAction = ReturnType<typeof getSupportsInterface>;
/** @internal */
export const isGetSupportsInterfaceAction = getSupportsInterface.match;
