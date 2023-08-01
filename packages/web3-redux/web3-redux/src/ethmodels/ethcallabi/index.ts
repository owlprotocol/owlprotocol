import { EthCallAbiActions } from "@owlprotocol/web3-actions";
import { EthCallAbiDexie } from "@owlprotocol/web3-dexie";
import { EthCallAbiDexieHooks } from "@owlprotocol/web3-dexie-hooks";

export const EthCallAbiHelpers = {
    ...EthCallAbiActions,
    ...EthCallAbiDexie,
    ...EthCallAbiDexieHooks,
};
