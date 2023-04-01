import { createCRUDHooks } from "@owlprotocol/crud-redux-orm-hooks";
import { Config, ConfigId, ConfigName, ConfigWithObjects } from "@owlprotocol/web3-models";
import { ConfigSelectors } from "@owlprotocol/web3-redux-orm";

export const ConfigSelectorHooks = createCRUDHooks<typeof ConfigName, ConfigId, Config, any, ConfigWithObjects>(
    ConfigSelectors,
);
