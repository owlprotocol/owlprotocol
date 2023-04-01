import { createCRUDSelectors } from "@owlprotocol/crud-redux-orm";
import { NetworkId, Network, NetworkName, NetworkWithObjects, toPrimaryKeyNetwork } from "@owlprotocol/web3-models";
import { toReduxOrmId } from "@owlprotocol/utils";
import { orm } from "../orm.js";

export const NetworkSelectors = createCRUDSelectors<typeof NetworkName, NetworkId, Network, NetworkWithObjects>(
    NetworkName,
    {
        toPrimaryKeyString: (id: NetworkId | string) =>
            typeof id === "string" ? id : toReduxOrmId(toPrimaryKeyNetwork(id)),
    },
    orm,
);
