import type { ConfigId, Config, ConfigName } from "@owlprotocol/web3-models";
import type { CRUDTable } from "@owlprotocol/crud-dexie";
import { createDexieIndexDefSingle } from "@owlprotocol/crud-dexie";
import type { Concat } from "@owlprotocol/utils";
export type { ConfigId, Config } from "@owlprotocol/web3-models";

export type ConfigKeyId = string;
export type ConfigKeyIdEq = ConfigId;
const ConfigById = createDexieIndexDefSingle("id");
export const ConfigIdx = [ConfigById].join(",") as Concat<[typeof ConfigById]>;
export type ConfigKeyIdx = {
    [ConfigById]: ConfigKeyId;
};
export type ConfigKeyIdxEq = ConfigId;
export type ConfigKeyIdxEqAny = { id: string[] | string };

export type ConfigTable = CRUDTable<
    typeof ConfigName,
    Config,
    ConfigKeyId,
    ConfigKeyIdEq,
    ConfigKeyIdx,
    ConfigKeyIdxEq
>;
