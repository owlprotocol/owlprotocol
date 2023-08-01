import { createCRUDSelectors } from "@owlprotocol/crud-redux-orm";
import { ConfigId, Config, ConfigName, ConfigWithObjects, toPrimaryKeyConfig } from "@owlprotocol/web3-models";
import { toReduxOrmId } from "@owlprotocol/utils";
import { orm } from "../orm.js";

export const ConfigSelectors = createCRUDSelectors<typeof ConfigName, ConfigId, Config, ConfigWithObjects>(
    ConfigName,
    {
        toPrimaryKeyString: (id: ConfigId | string) =>
            typeof id === "string" ? id : toReduxOrmId(toPrimaryKeyConfig(id)),
    },
    orm,
);
