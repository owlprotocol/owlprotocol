import { EthLogAbiActions } from "@owlprotocol/web3-actions";
import { EthLogAbiDexie } from "@owlprotocol/web3-dexie";
import { EthLogAbiDexieHooks } from "@owlprotocol/web3-dexie-hooks";

export const EthLogAbiHelpers = {
    ...EthLogAbiActions,
    ...EthLogAbiDexie,
    ...EthLogAbiDexieHooks,
};
