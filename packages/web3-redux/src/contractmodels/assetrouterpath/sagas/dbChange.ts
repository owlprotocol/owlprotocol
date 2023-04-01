/* eslint-disable */
import { AssetRouterPathCRUD } from "../crud.js";

//Handle contract creation
export function* dbCreatingSaga(
    action: ReturnType<typeof AssetRouterPathCRUD.actions.dbCreating>,
): Generator<any, any> { }

export function* dbUpdatingSaga(
    action: ReturnType<typeof AssetRouterPathCRUD.actions.dbUpdating>,
): Generator<any, any> { }

//Handle contract creation
export function* dbDeletingSaga(
    action: ReturnType<typeof AssetRouterPathCRUD.actions.dbDeleting>,
): Generator<any, any> { }
