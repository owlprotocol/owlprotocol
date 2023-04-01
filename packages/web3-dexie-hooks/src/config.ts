import { createCRUDDexieHooks } from "@owlprotocol/crud-dexie-hooks";
import {
    ConfigDexie,
    Config,
    ConfigKeyId,
    ConfigKeyIdx,
    ConfigKeyIdEq,
    ConfigKeyIdxEq,
    ConfigKeyIdxEqAny,
} from "@owlprotocol/web3-dexie";

export const ConfigDexieHooks = createCRUDDexieHooks<
    Config,
    ConfigKeyId,
    ConfigKeyIdx,
    ConfigKeyIdEq,
    ConfigKeyIdxEq,
    ConfigKeyIdxEqAny
>(ConfigDexie);
