import { createCRUDDB } from "@owlprotocol/crud-dexie";
import { Config, ConfigName } from "@owlprotocol/web3-models";
import { ConfigKeyId, ConfigKeyIdEq, ConfigKeyIdx, ConfigKeyIdxEq, ConfigKeyIdxEqAny } from "../tables/config.js";
import { Web3Dexie } from "../dbIndex.js";

export function getConfigDexie() {
    return createCRUDDB<
        typeof ConfigName,
        Config,
        ConfigKeyId,
        ConfigKeyIdEq,
        ConfigKeyIdx,
        ConfigKeyIdxEq,
        ConfigKeyIdxEqAny
    >(Web3Dexie, Web3Dexie[ConfigName], {
        validateId: ({ id }) => {
            return { id };
        },
        toPrimaryKey: ({ id }) => {
            return id;
        },
        preWriteBulkDB: (items) => Promise.resolve(items),
        postWriteBulkDB: () => Promise.resolve(),
    });
}

export const ConfigDexie = getConfigDexie();
