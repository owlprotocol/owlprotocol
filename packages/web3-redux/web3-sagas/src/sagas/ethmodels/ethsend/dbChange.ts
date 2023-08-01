/* eslint-disable */
import { EthSendCRUDActions } from "@owlprotocol/web3-actions";

//Handle contract creation
export function* dbCreatingSaga(
    action: ReturnType<typeof EthSendCRUDActions.actions.dbCreating>
): Generator<any, any> { }

export function* dbUpdatingSaga(
    action: ReturnType<typeof EthSendCRUDActions.actions.dbUpdating>
): Generator<any, any> { }

//Handle contract creation
export function* dbDeletingSaga(
    action: ReturnType<typeof EthSendCRUDActions.actions.dbDeleting>
): Generator<any, any> { }
