import {
    ChildId,
    Child,
    toPrimaryKeyChild,
    ChildName,
    validateIdChild,
    validateChild,
} from "@owlprotocol/crud-models/test";
import { toReduxOrmId } from "@owlprotocol/utils";
import { createCRUDActions } from "../createCRUDActions.js";

export const ChildCRUDActions = createCRUDActions<typeof ChildName, ChildId, Child, Child>(ChildName, {
    validateId: validateIdChild,
    validate: validateChild,
    toPrimaryKeyString: (id: ChildId) => toReduxOrmId(toPrimaryKeyChild(id)),
});
