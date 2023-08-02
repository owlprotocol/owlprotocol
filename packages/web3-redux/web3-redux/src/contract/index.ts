import { ContractActions, ContractCustomActions } from "@owlprotocol/web3-actions";
import { ContractDexie, ContractCustomDexie } from "@owlprotocol/web3-dexie";
import { ContractDexieHooks, ContractCustomDexieHooks } from "@owlprotocol/web3-dexie-hooks";

export const ContractHelpers = {
    ...ContractActions,
    ...ContractCustomActions,
    ...ContractDexie,
    ...ContractCustomDexie,
    ...ContractDexieHooks,
    ...ContractCustomDexieHooks,
};
