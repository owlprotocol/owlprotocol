import { EthBlockActions } from "@owlprotocol/web3-actions";
import { EthBlockDexie } from "@owlprotocol/web3-dexie";
import { EthBlockDexieHooks } from "@owlprotocol/web3-dexie-hooks";

export const EthBlockHelpers = {
    ...EthBlockActions,
    ...EthBlockDexie,
    ...EthBlockDexieHooks,
};
