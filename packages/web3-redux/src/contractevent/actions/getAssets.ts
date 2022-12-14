import { v4 as uuidv4 } from 'uuid';
import { createAction } from '@owlprotocol/crud-redux';

import { name } from '../common.js';

/** @internal */
export const GET_ASSETS = `${name}/GET_ASSETS`;
/** @internal */
export interface GetAssetsActionInput {
    networkId: string;
    address: string; //| string[];
}
/**
 * @category Actions
 * Get all assets (ERC20,ERC721,ERC1155) that `address` has received/sent.
 * Note this assumes the contracts use the standard event signatures for the interfaces.
 * It is also possible that some returned addresses might NOT be one of the above
 * interfaces but simply implement one of event signatures.
 */
export const getAssets = createAction(GET_ASSETS, (payload: GetAssetsActionInput, uuid?: string) => {
    return {
        payload: { networkId: payload.networkId, address: payload.address.toLowerCase() },
        meta: {
            uuid: uuid ?? uuidv4(),
        },
    };
});
/** @internal */
export type GetAssetsAction = ReturnType<typeof getAssets>;
/** @internal */
export const isGetAssetsAction = getAssets.match;

export default getAssets;
