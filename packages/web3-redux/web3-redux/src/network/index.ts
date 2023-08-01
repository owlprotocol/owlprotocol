import { NetworkActions } from "@owlprotocol/web3-actions";
import { NetworkDexie } from "@owlprotocol/web3-dexie";
import { NetworkDexieHooks } from "@owlprotocol/web3-dexie-hooks";

export const NetworkHelpers = {
    ...NetworkActions,
    ...NetworkDexie,
    ...NetworkDexieHooks,
};
