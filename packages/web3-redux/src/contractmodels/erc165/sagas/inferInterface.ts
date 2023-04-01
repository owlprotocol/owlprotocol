/* eslint-disable no-empty */
import { put, call, select, all } from "typed-redux-saga";
import { interfaces, Utils } from "@owlprotocol/contracts";
import { NetworkCRUD } from "../../../network/crud.js";
import { ADDRESS_1 } from "../../../data.js";
import { ERC165CRUD } from "../crud.js";
import { ContractHelpers } from "../../../common/contracts.js";
import { InferInterfaceAction } from "../actions/inferInterface.js";
import { ContractCRUD } from "../../../contract/crud.js";
import { fetchERC165 } from "../../actions/fetchERC165.js";

export function* inferIERC165(networkId: string, address: string): Generator<any, boolean> {
    //IERC165
    try {
        const supported = yield* ContractHelpers.IERC165.callSaga.supportsInterface({
            networkId,
            to: address,
            args: [interfaces.IERC165.interfaceId],
            maxCacheAge: Number.MAX_SAFE_INTEGER,
        });
        if (supported.returnValue && supported.returnValue[0]) {
            return true;
        } else {
            return false;
        }
        //Unsupported
        // eslint-disable-next-line prettier/prettier
    } catch (error) { }

    return false;
}

export function* inferIERC20(networkId: string, address: string): Generator<any, string[] | undefined> {
    //IERC20
    try {
        const balanceOf = yield* ContractHelpers.IERC20.callSaga.balanceOf({
            networkId,
            to: address,
            args: [ADDRESS_1],
        });
        if (balanceOf.returnValue) {
            yield* put(
                ERC165CRUD.actions.create({
                    networkId,
                    address,
                    interfaceId: interfaces.IERC20.interfaceId,
                }),
            );
            try {
                const name = yield* ContractHelpers.IERC20Metadata.callSaga.name({
                    networkId,
                    to: address,
                    args: [],
                });
                if (name.returnValue) {
                    //Pseudo-ethcall (used for filtering)
                    yield* put(
                        ERC165CRUD.actions.create({
                            networkId,
                            address,
                            interfaceId: interfaces.IERC20Metadata.interfaceId,
                        }),
                    );

                    //Update to IERC20Metadata
                    return [interfaces.IERC20.interfaceId, interfaces.IERC20Metadata.interfaceId];
                }
            } catch {
                //
            }
            //Update to IERC20
            return [interfaces.IERC20.interfaceId];
        }
    } catch {
        //
    }
}

export function* inferIERC721(networkId: string, address: string): Generator<any, string[] | undefined> {
    //IERC721
    try {
        const ownerOf = yield* ContractHelpers.IERC721.callSaga.ownerOf({
            networkId,
            to: address,
            args: [1],
        });
        if (ownerOf.returnValue) {
            //Pseudo-ethcall (used for filtering)
            yield* put(
                ERC165CRUD.actions.create({
                    networkId,
                    address,
                    interfaceId: interfaces.IERC721.interfaceId,
                }),
            );
            try {
                const tokenUri = yield* ContractHelpers.IERC721Metadata.callSaga.tokenURI({
                    networkId,
                    to: address,
                    args: [1],
                });
                if (tokenUri.returnValue) {
                    //Pseudo-ethcall (used for filtering)
                    yield* put(
                        ERC165CRUD.actions.create({
                            networkId,
                            address,
                            interfaceId: interfaces.IERC721Metadata.interfaceId,
                        }),
                    );
                    //Update to IERC721Metadata
                    return [interfaces.IERC721.interfaceId, interfaces.IERC721Metadata.interfaceId];
                }
                // eslint-disable-next-line prettier/prettier
            } catch { }

            //Update to IERC721
            return [interfaces.IERC721.interfaceId];
        }
        // eslint-disable-next-line prettier/prettier
    } catch (err) { }
}

export function* inferIERC1155(networkId: string, address: string): Generator<any, string[] | undefined> {
    //IERC1155
    try {
        const balanceOf = yield* ContractHelpers.IERC1155.callSaga.balanceOf({
            networkId,
            to: address,
            args: [ADDRESS_1, 1],
        });
        if (balanceOf.returnValue) {
            //Pseudo-ethcall (used for filtering)
            yield* put(
                ERC165CRUD.actions.create({
                    networkId,
                    address,
                    interfaceId: interfaces.IERC1155.interfaceId,
                }),
            );
            try {
                const uri = yield* ContractHelpers.IERC1155MetadataURI.callSaga.uri({
                    networkId,
                    to: address,
                    args: [1],
                });
                if (uri.returnValue) {
                    //Pseudo-ethcall (used for filtering)
                    yield* put(
                        ERC165CRUD.actions.create({
                            networkId,
                            address,
                            interfaceId: interfaces.IERC1155MetadataURI.interfaceId,
                        }),
                    );
                    //IERC1155MetadataURI
                    return [interfaces.IERC1155.interfaceId, interfaces.IERC1155MetadataURI.interfaceId];
                }
                // eslint-disable-next-line prettier/prettier
            } catch { }
            return [interfaces.IERC1155.interfaceId];
        }
        // eslint-disable-next-line prettier/prettier
    } catch { }
}

export function* inferInterface(networkId: string, address: string): Generator<any, string[]> {
    if (address === Utils.ERC1820.registryAddress.toLowerCase()) {
        yield* put(
            ERC165CRUD.actions.create({
                networkId,
                address,
                interfaceId: interfaces.IERC1820.interfaceId,
            }),
        );
        return [interfaces.IERC1820.interfaceId];
    }

    if (address === Utils.ERC1167Factory.ERC1167FactoryAddress.toLowerCase()) {
        yield* put(
            ERC165CRUD.actions.create({
                networkId,
                address,
                interfaceId: interfaces.IERC1167Factory.interfaceId,
            }),
        );
        return [interfaces.IERC1167Factory.interfaceId];
    }

    const network = yield* select(NetworkCRUD.selectors.selectByIdSingle, networkId);
    if (!network) throw new Error(`Network ${networkId} undefined`);

    const web3 = network.web3;
    if (!web3) throw new Error(`Network ${networkId} missing web3`);

    const isIERC165 = yield* call(inferIERC165, networkId, address);
    if (isIERC165) {
        yield* all(fetchERC165(networkId, address).map((a) => put(a)));
        return [interfaces.IERC165.interfaceId];
    }
    const isIERC721 = yield* call(inferIERC721, networkId, address);
    if (isIERC721) return isIERC721;
    const isIERC1155 = yield* call(inferIERC1155, networkId, address);
    if (isIERC1155) return isIERC1155;
    const isIERC20 = yield* call(inferIERC20, networkId, address);
    if (isIERC20) return isIERC20;

    return [];
}

/** @category Sagas */
export function* inferInterfaceSaga(action: InferInterfaceAction): Generator<any, string[]> {
    const { payload } = action;
    const { networkId, address, interfaceCheckedAtMaxCacheAge } = payload;

    const contract = yield* call(ContractCRUD.db.get, { networkId, address });
    if (contract?.interfaceCheckedAt && Date.now() - contract.interfaceCheckedAt < interfaceCheckedAtMaxCacheAge) {
        const erc165 = yield* call(ERC165CRUD.db.where, { networkId, address });
        return erc165.map((c) => c.interfaceId); //ABI Known
    }

    yield put(ContractCRUD.actions.upsert({ networkId, address, interfaceCheckedAt: Date.now() }));
    const interfaceIds = yield* call(inferInterface, networkId, address);

    if (interfaceIds.length > 0) {
        ERC165CRUD.actions.updateBatched(
            interfaceIds.map((interfaceId) => {
                return { networkId, address, interfaceId };
            }),
        );
    }

    return interfaceIds;
}
