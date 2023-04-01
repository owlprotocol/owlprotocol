import {
    AssetRouterInputBasketId,
    AssetRouterInputBasket,
    validateIdAssetRouterInputBasket,
    validateAssetRouterInputBasket,
    toPrimaryKeyAssetRouterInputBasket,
} from "@owlprotocol/web3-models";
import { AssetRouterInputBasketName } from "@owlprotocol/web3-models";
import { createCRUDActions } from "@owlprotocol/crud-actions";
import { toReduxOrmId } from "@owlprotocol/utils";

export const AssetRouterInputBasketCRUDActions = createCRUDActions<
    typeof AssetRouterInputBasketName,
    AssetRouterInputBasketId,
    AssetRouterInputBasket,
    AssetRouterInputBasket
>(AssetRouterInputBasketName, {
    validateId: validateIdAssetRouterInputBasket,
    validate: validateAssetRouterInputBasket,
    toPrimaryKeyString: (id: AssetRouterInputBasketId) => toReduxOrmId(toPrimaryKeyAssetRouterInputBasket(id)),
});
