import { put } from "typed-redux-saga";
import { ContractHelpers } from "../../../common/contracts.js";
import { ERC1155CRUD } from "../crud.js";

//Handle contract creation
export function* dbCreatingSaga(action: ReturnType<typeof ERC1155CRUD.actions.dbCreating>): Generator<any, any> {
    const { payload } = action;
    const { networkId, address, id, uri, dna } = payload.obj;

    if (!uri) {
        yield* put(
            ContractHelpers.IERC1155MetadataURI.uri({
                networkId,
                to: address,
                args: [id],
            }),
        );
    }

    if (!dna) {
        yield* put(
            ContractHelpers.IERC1155Dna.getDna({
                networkId,
                to: address,
                args: [id],
            }),
        );
    }
}

/*
export function* dbUpdatingSaga(action: ReturnType<typeof ERC1155CRUD.actions.dbUpdating>): Generator<any, any> { }

//Handle contract creation
export function* dbDeletingSaga(action: ReturnType<typeof ERC1155CRUD.actions.dbDeleting>): Generator<any, any> { }
*/
