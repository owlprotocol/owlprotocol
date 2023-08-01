import { put } from "typed-redux-saga";
import {
    ContractCustomActions,
    ERC721CRUDActions,
} from "@owlprotocol/web3-actions";

//Handle contract creation
export function* dbCreatingSaga(
    action: ReturnType<typeof ERC721CRUDActions.actions.dbCreating>
): Generator<any, any> {
    const { payload } = action;
    const {
        networkId,
        address,
        tokenId,
        owner,
        approved,
        tokenURI,
        dna,
    } = payload.obj;

    if (!owner) {
        yield* put(
            ContractCustomActions.IERC721.ownerOf({
                networkId,
                to: address,
                args: [tokenId],
            })
        );
    }
    if (!approved) {
        yield* put(
            ContractCustomActions.IERC721.getApproved({
                networkId,
                to: address,
                args: [tokenId],
            })
        );
    }
    if (!tokenURI) {
        yield* put(
            ContractCustomActions.IERC721Metadata.tokenURI({
                networkId,
                to: address,
                args: [tokenId],
            })
        );
    }
    if (!dna) {
        yield* put(
            ContractCustomActions.ITokenDna.getDna({
                networkId,
                to: address,
                args: [tokenId],
            })
        );
    }
}

/*
export function* dbUpdatingSaga(
    action: ReturnType<typeof ERC721CRUDActions.actions.dbUpdating>
): Generator<any, any> { }

//Handle contract creation
export function* dbDeletingSaga(
    action: ReturnType<typeof ERC721CRUDActions.actions.dbDeleting>
): Generator<any, any> { }
*/
