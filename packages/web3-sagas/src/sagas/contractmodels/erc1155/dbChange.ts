import { put } from "typed-redux-saga";
import { ContractActionHelpers } from "@owlprotocol/web3-actions";
import { ERC1155CRUDActions } from "@owlprotocol/web3-actions";

//Handle contract creation
export function* dbCreatingSaga(action: ReturnType<typeof ERC1155CRUDActions.actions.dbCreating>): Generator<any, any> {
    const { payload } = action;
    const { networkId, address, id, uri, dna } = payload.obj;

    if (!uri) {
        yield* put(
            ContractActionHelpers.IERC1155MetadataURI.uri({
                networkId,
                to: address,
                args: [id],
            }),
        );
    }

    if (!dna) {
        yield* put(
            ContractActionHelpers.IERC1155Dna.getDna({
                networkId,
                to: address,
                args: [id],
            }),
        );
    }
}

/*
export function* dbUpdatingSaga(action: ReturnType<typeof ERC1155CRUDActions.actions.dbUpdating>): Generator<any, any> { }

//Handle contract creation
export function* dbDeletingSaga(action: ReturnType<typeof ERC1155CRUDActions.actions.dbDeleting>): Generator<any, any> { }
*/
