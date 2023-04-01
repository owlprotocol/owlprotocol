/* eslint-disable */
import { EthSendCRUD } from "../crud.js";

//Handle contract creation
export function* dbCreatingSaga(
    action: ReturnType<typeof EthSendCRUD.actions.dbCreating>
): Generator<any, any> { }

export function* dbUpdatingSaga(
    action: ReturnType<typeof EthSendCRUD.actions.dbUpdating>
): Generator<any, any> { }

//Handle contract creation
export function* dbDeletingSaga(
    action: ReturnType<typeof EthSendCRUD.actions.dbDeleting>
): Generator<any, any> { }
