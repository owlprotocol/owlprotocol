import {
    HTTPCacheId,
    HTTPCache,
    validateIdHTTPCache,
    validateHTTPCache,
    toPrimaryKeyHTTPCache,
} from "@owlprotocol/web3-models";
import { HTTPCacheName } from "@owlprotocol/web3-models";
import { createCRUDActions } from "@owlprotocol/crud-actions";
import { toReduxOrmId } from "@owlprotocol/utils";

export const HTTPCacheCRUDActions = createCRUDActions<typeof HTTPCacheName, HTTPCacheId, HTTPCache, HTTPCache>(
    HTTPCacheName,
    {
        validateId: validateIdHTTPCache,
        validate: validateHTTPCache,
        toPrimaryKeyString: (id: HTTPCacheId) => toReduxOrmId(toPrimaryKeyHTTPCache(id)),
    },
);
