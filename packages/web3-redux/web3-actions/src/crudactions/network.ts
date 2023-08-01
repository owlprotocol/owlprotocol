import { NetworkId, Network, NetworkWithObjects, toPrimaryKeyNetwork } from "@owlprotocol/web3-models";
import { NetworkName, validateIdNetwork, validateNetwork } from "@owlprotocol/web3-models";
import { createCRUDActions } from "@owlprotocol/crud-actions";
import { toReduxOrmId } from "@owlprotocol/utils";

export const NetworkCRUDActions = createCRUDActions<
    typeof NetworkName,
    NetworkId,
    Network,
    Network,
    NetworkWithObjects
>(NetworkName, {
    validateId: validateIdNetwork,
    validate: validateNetwork,
    toPrimaryKeyString: (id: NetworkId) => toReduxOrmId(toPrimaryKeyNetwork(id)),
});
