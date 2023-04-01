import {
    ChildDexie,
    Child,
    ChildKeyId,
    ChildKeyIdx,
    ChildKeyIdEq,
    ChildKeyIdxEq,
    ChildKeyIdxEqAny,
} from "@owlprotocol/crud-dexie/test";
import { createCRUDDexieHooks } from "../createCRUDDexieHooks.js";

export const ChildDexieHooks = createCRUDDexieHooks<
    Child,
    ChildKeyId,
    ChildKeyIdx,
    ChildKeyIdEq,
    ChildKeyIdxEq,
    ChildKeyIdxEqAny
>(ChildDexie);
