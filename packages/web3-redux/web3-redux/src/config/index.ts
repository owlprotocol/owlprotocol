import { ConfigActions } from "@owlprotocol/web3-actions";
import { ConfigDexie } from "@owlprotocol/web3-dexie";
import { ConfigDexieHooks } from "@owlprotocol/web3-dexie-hooks";
import { ConfigSelectors } from "@owlprotocol/web3-redux-orm";
import { ConfigSelectorHooks } from "@owlprotocol/web3-redux-orm-hooks";

export const ConfigHelpers = {
    ...ConfigActions,
    ...ConfigDexie,
    ...ConfigDexieHooks,
    ...ConfigSelectors,
    ...ConfigSelectorHooks,
};
