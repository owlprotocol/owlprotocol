import { ChildId, Child, ChildName, ChildWithObjects, validateWithReduxChild } from "@owlprotocol/crud-models/test";
import { ChildCRUDActions } from "@owlprotocol/crud-actions/test";
import { createCRUDReducer } from "../createCRUDReducer.js";

export const ChildReducer = createCRUDReducer<typeof ChildName, ChildId, Child, ChildWithObjects>(
    ChildName,
    { validateWithRedux: validateWithReduxChild },
    {
        //@ts-expect-error
        isReduxUpsertAction: ChildCRUDActions.actions.reduxUpsert.match,
        //@ts-expect-error
        isReduxUpsertBatchedAction: ChildCRUDActions.actions.reduxUpsertBatched.match,
        //@ts-expect-error
        isReduxDeleteAction: ChildCRUDActions.actions.reduxDelete.match,
    },
);
