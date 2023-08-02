import { createCRUDHooks } from "@owlprotocol/crud-redux-orm-hooks";
import { Network, NetworkId, NetworkName, NetworkWithObjects } from "@owlprotocol/web3-models";
import { NetworkSelectors } from "@owlprotocol/web3-redux-orm";

export const NetworkSelectorHooks = createCRUDHooks<typeof NetworkName, NetworkId, Network, any, NetworkWithObjects>(
    NetworkSelectors,
);
