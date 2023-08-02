import { EthLogSubscribeActions } from "@owlprotocol/web3-actions";
import { EthLogSubscribeDexie } from "@owlprotocol/web3-dexie";
import { EthLogSubscribeDexieHooks } from "@owlprotocol/web3-dexie-hooks";

export const EthLogSubscribeHelpers = {
    ...EthLogSubscribeActions,
    ...EthLogSubscribeDexie,
    ...EthLogSubscribeDexieHooks,
};
