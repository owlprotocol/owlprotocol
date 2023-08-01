import { EthLogQueryActions } from "@owlprotocol/web3-actions";
import { EthLogQueryDexie } from "@owlprotocol/web3-dexie";
import { EthLogQueryDexieHooks } from "@owlprotocol/web3-dexie-hooks";

export const EthLogQueryHelpers = {
    ...EthLogQueryActions,
    ...EthLogQueryDexie,
    ...EthLogQueryDexieHooks,
};
