import { ReduxErrorId, ReduxError, toPrimaryKeyReduxError } from "@owlprotocol/crud-models";
import { ReduxErrorName, validateIdReduxError, validateReduxError } from "@owlprotocol/crud-models";
import { createCRUDActions } from "./createCRUDActions.js";

export const ReduxErrorCRUDActions = createCRUDActions<typeof ReduxErrorName, ReduxErrorId, ReduxError, ReduxError>(
    ReduxErrorName,
    {
        validateId: validateIdReduxError,
        validate: validateReduxError,
        toPrimaryKeyString: (id: ReduxErrorId) => toPrimaryKeyReduxError(id),
    },
);
