import { EthCallActions } from "@owlprotocol/web3-actions";
import { EthCallDexie } from "@owlprotocol/web3-dexie";
import { EthCallDexieHooks } from "@owlprotocol/web3-dexie-hooks";

export const EthCallHelpers = {
    ...EthCallActions,
    ...EthCallDexie,
    ...EthCallDexieHooks,
};
