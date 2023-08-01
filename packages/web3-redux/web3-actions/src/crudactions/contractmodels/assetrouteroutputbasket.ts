import {
    AssetRouterOutputBasketId,
    AssetRouterOutputBasket,
    validateIdAssetRouterOutputBasket,
    validateAssetRouterOutputBasket,
    toPrimaryKeyAssetRouterOutputBasket,
} from "@owlprotocol/web3-models";
import { AssetRouterOutputBasketName } from "@owlprotocol/web3-models";
import { createCRUDActions } from "@owlprotocol/crud-actions";
import { toReduxOrmId } from "@owlprotocol/utils";

export const AssetRouterOutputBasketCRUDActions = createCRUDActions<
    typeof AssetRouterOutputBasketName,
    AssetRouterOutputBasketId,
    AssetRouterOutputBasket,
    AssetRouterOutputBasket
>(AssetRouterOutputBasketName, {
    validateId: validateIdAssetRouterOutputBasket,
    validate: validateAssetRouterOutputBasket,
    toPrimaryKeyString: (id: AssetRouterOutputBasketId) => toReduxOrmId(toPrimaryKeyAssetRouterOutputBasket(id)),
});
