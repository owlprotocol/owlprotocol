import { put } from "typed-redux-saga";
import { ContractHelpers } from "../../../common/contracts.js";
import { ERC721CRUD } from "../crud.js";

//Handle contract creation
export function* dbCreatingSaga(action: ReturnType<typeof ERC721CRUD.actions.dbCreating>): Generator<any, any> {
    const { payload } = action;
    const { networkId, address, tokenId, owner, approved, tokenURI, dna } = payload.obj;

    if (!owner) {
        yield* put(
            ContractHelpers.IERC721.ownerOf({
                networkId,
                to: address,
                args: [tokenId],
            }),
        );
    }
    if (!approved) {
        yield* put(
            ContractHelpers.IERC721.getApproved({
                networkId,
                to: address,
                args: [tokenId],
            }),
        );
    }
    if (!tokenURI) {
        yield* put(
            ContractHelpers.IERC721Metadata.tokenURI({
                networkId,
                to: address,
                args: [tokenId],
            }),
        );
    }
    if (!dna) {
        yield* put(
            ContractHelpers.IERC721Dna.getDna({
                networkId,
                to: address,
                args: [tokenId],
            }),
        );
    }
}

/*
export function* dbUpdatingSaga(
    action: ReturnType<typeof ERC721CRUD.actions.dbUpdating>
): Generator<any, any> { }

//Handle contract creation
export function* dbDeletingSaga(
    action: ReturnType<typeof ERC721CRUD.actions.dbDeleting>
): Generator<any, any> { }
*/
