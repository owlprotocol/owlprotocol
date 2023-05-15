import {
    getChildDexie,
    Child,
    ChildKeyId,
    ChildKeyIdx,
    ChildKeyIdEq,
    ChildKeyIdxEq,
    ChildKeyIdxEqAny,
} from "@owlprotocol/crud-dexie/test";
import { createCRUDDexieHooks } from "../createCRUDDexieHooks.js";

export function getChildDexieHooks(childDexie: ReturnType<typeof getChildDexie>) {
    return createCRUDDexieHooks<Child, ChildKeyId, ChildKeyIdx, ChildKeyIdEq, ChildKeyIdxEq, ChildKeyIdxEqAny>(
        childDexie,
    );
}
