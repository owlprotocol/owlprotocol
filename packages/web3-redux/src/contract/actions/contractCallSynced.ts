import { v4 as uuidv4 } from "uuid";
import { ContractCallActionInput, contractCallAction } from "./contractCall.js";
import { GenericSync, createSyncForActions } from "../../sync/model/index.js";
import { SyncCRUD } from "../../sync/crud.js";

/** @internal */
export interface ContractCallSyncedActionInput extends ContractCallActionInput {
    defaultBlock?: undefined; //CallSynced actions cannot define defaultBlock parameter
    sync: GenericSync;
}
/**
 * Creates a CALL action and an associated SYNC action
 * @category Actions
 *
 */
export const contractCallSynced = (payload: ContractCallSyncedActionInput, uuid?: string) => {
    const { networkId, to } = payload;
    const callAction = contractCallAction(payload);
    const sync = createSyncForActions(callAction.meta.uuid, networkId, [callAction], payload.sync, to);
    if (sync) sync.id = `${sync.type}-${JSON.stringify(callAction.payload)}`;
    const syncAction = sync ? SyncCRUD.actions.upsert(sync, uuid ?? uuidv4()) : undefined;
    return { callAction, syncAction };
};
