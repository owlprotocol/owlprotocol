import { put } from "typed-redux-saga";
import { ContractCustomActions } from "@owlprotocol/web3-actions";
import { ERC1155CRUDActions } from "@owlprotocol/web3-actions";

//Handle contract creation
export function* dbCreatingSaga(
    action: ReturnType<typeof ERC1155CRUDActions.actions.dbCreating>
): Generator<any, any> {
    const { payload } = action;
    const { networkId, address, id, uri, dna } = payload.obj;

    if (!uri) {
        yield* put(
            ContractCustomActions.IERC1155MetadataURI.uri({
                networkId,
                to: address,
                args: [id],
            })
        );
    }

    if (!dna) {
        yield* put(
            ContractCustomActions.ITokenDna.getDna({
                networkId,
                to: address,
                args: [id],
            })
        );
    }
}

/*
export function* dbUpdatingSaga(action: ReturnType<typeof ERC1155CRUDActions.actions.dbUpdating>): Generator<any, any> { }

//Handle contract creation
export function* dbDeletingSaga(action: ReturnType<typeof ERC1155CRUDActions.actions.dbDeleting>): Generator<any, any> { }
*/
