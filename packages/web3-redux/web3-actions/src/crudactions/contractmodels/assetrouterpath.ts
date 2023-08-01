import {
    AssetRouterPathId,
    AssetRouterPath,
    validateIdAssetRouterPath,
    validateAssetRouterPath,
    toPrimaryKeyAssetRouterPath,
} from "@owlprotocol/web3-models";
import { AssetRouterPathName } from "@owlprotocol/web3-models";
import { createCRUDActions } from "@owlprotocol/crud-actions";
import { toReduxOrmId } from "@owlprotocol/utils";

export const AssetRouterPathCRUDActions = createCRUDActions<
    typeof AssetRouterPathName,
    AssetRouterPathId,
    AssetRouterPath,
    AssetRouterPath
>(AssetRouterPathName, {
    validateId: validateIdAssetRouterPath,
    validate: validateAssetRouterPath,
    toPrimaryKeyString: (id: AssetRouterPathId) => toReduxOrmId(toPrimaryKeyAssetRouterPath(id)),
});
