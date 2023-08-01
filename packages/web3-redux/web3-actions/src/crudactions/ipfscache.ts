import {
    IPFSCacheId,
    IPFSCache,
    validateIdIPFSCache,
    validateIPFSCache,
    toPrimaryKeyIPFSCache,
} from "@owlprotocol/web3-models";
import { IPFSCacheName } from "@owlprotocol/web3-models";
import { createCRUDActions } from "@owlprotocol/crud-actions";
import { toReduxOrmId } from "@owlprotocol/utils";

export const IPFSCacheCRUDActions = createCRUDActions<typeof IPFSCacheName, IPFSCacheId, IPFSCache, IPFSCache>(
    IPFSCacheName,
    {
        validateId: validateIdIPFSCache,
        validate: validateIPFSCache,
        toPrimaryKeyString: (id: IPFSCacheId) => toReduxOrmId(toPrimaryKeyIPFSCache(id)),
    },
);
