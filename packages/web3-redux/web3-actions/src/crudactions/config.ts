import { ConfigId, Config, ConfigWithObjects, toPrimaryKeyConfig } from "@owlprotocol/web3-models";
import { ConfigName, validateIdConfig, validateConfig } from "@owlprotocol/web3-models";
import { createCRUDActions } from "@owlprotocol/crud-actions";
import { toReduxOrmId } from "@owlprotocol/utils";

export const ConfigCRUDActions = createCRUDActions<typeof ConfigName, ConfigId, Config, Config, ConfigWithObjects>(
    ConfigName,
    {
        validateId: validateIdConfig,
        validate: validateConfig,
        toPrimaryKeyString: (id: ConfigId) => toReduxOrmId(toPrimaryKeyConfig(id)),
    },
);
