import { put, call, all } from 'typed-redux-saga';
import { InferInterfaceAction } from '../actions/index.js';
import { ContractCRUD } from '../crud.js';
import { NetworkCRUD } from '../../network/crud.js'
import { fetchSaga as fetchNetworkSaga } from '../../network/sagas/fetch.js';
import { Artifacts, Web3, interfaces, Utils, interfaceIds as interfaceIdsToAbis, interfaceIdNames } from '@owlprotocol/contracts';
import { ADDRESS_1 } from '../../data.js';
import { flatten, uniqWith, isEqual } from 'lodash-es';
import { callSagaERC165SupportsInterface } from './call.js';
import { call as callAction } from '../actions/index.js'
import { AbiItem } from 'web3-utils';
import { Web3ContractMethodParams } from '@owlprotocol/contracts/lib/types/web3/types.js';
import EthCallCRUD from '../../ethcall/crud.js';

export function* fetchERC165(networkId: string, address: string): Generator<any, {
    abi: AbiItem[]
    interfaceIds: string[]
}> {
    const tasks = Object.keys(interfaceIdNames).map((interfaceId) =>
        call(callSagaERC165SupportsInterface, callAction<Web3ContractMethodParams<Web3.IERC165, 'supportsInterface'>>({ networkId, address, args: [interfaceId], maxCacheAge: Number.MAX_SAFE_INTEGER }))
    )
    const results = yield* all(tasks)
    const interfaceIds = results.filter((r) => r.ethcall.returnValue).map((r) => r.ethcall.args![0] as string)
    const abiList = flatten(interfaceIds.map((interfaceId) => interfaceIdsToAbis[interfaceId]))
    const abi = uniqWith(abiList, isEqual)
    return { abi, interfaceIds }
}

export function* inferInterface(networkId: string, address: string): Generator<any, {
    abi: AbiItem[]
    interfaceIds: string[]
}> {
    if (address === Utils.ERC1820.registryAddress.toLowerCase()) {
        return {
            abi: Artifacts.IERC1820Registry.abi, interfaceIds: [interfaces.IERC1820.interfaceId]
        };
    }

    const { network } = yield* call(fetchNetworkSaga, NetworkCRUD.actions.fetch({ networkId }));
    if (!network) throw new Error(`Network ${networkId} undefined`);

    const web3 = network.web3;
    if (!web3) throw new Error(`Network ${networkId} missing web3`);

    //IERC165
    try {
        const IERC165Contract = new web3.eth.Contract(Artifacts.IERC165.abi, address)
        const supported = yield* call(IERC165Contract.methods.supportsInterface(interfaces.IERC165.interfaceId).call)
        if (supported) {
            //Avoid error on cached IERC165 calls
            yield* put(ContractCRUD.actions.reduxUpsert({ networkId, address, abi: Artifacts.IERC165.abi }));
            const { abi, interfaceIds } = yield* call(fetchERC165, networkId, address)
            //Update to IERC165 + Derive other interfaces
            return { abi, interfaceIds }
        }
        //Unsupported
    } catch (error) { }

    //IERC20
    try {
        const IERC20 = new web3.eth.Contract(Artifacts.IERC20.abi, address)
        const balanceOf = yield* call(IERC20.methods.balanceOf(ADDRESS_1))
        if (balanceOf != undefined) {
            yield* put(EthCallCRUD.actions.create({
                networkId,
                to: address,
                data: '0x',
                methodName: 'supportsInterface',
                args: [interfaces.IERC20.interfaceId],
                returnValue: true
            }))
            try {
                const IERC20Metadata = new web3.eth.Contract(Artifacts.IERC20Metadata.abi, address)
                const name = yield* call(IERC20Metadata.methods.name)
                if (name != undefined) {
                    //Pseudo-ethcall (used for filtering)
                    yield* put(EthCallCRUD.actions.create({
                        networkId,
                        to: address,
                        data: '0x',
                        methodName: 'supportsInterface',
                        args: [interfaces.IERC20Metadata.interfaceId],
                        returnValue: true
                    }))

                    //Update to IERC20Metadata
                    return {
                        abi: Artifacts.IERC20Metadata.abi,
                        interfaceIds: [
                            interfaces.IERC20.interfaceId,
                            interfaces.IERC20Metadata.interfaceId
                        ]
                    }
                }
            } catch { }
            //Update to IERC20
            return {
                abi: Artifacts.IERC20.abi, interfaceIds: [interfaces.IERC20.interfaceId]
            }
        }
    } catch { }

    //IERC721
    try {
        const IERC721 = new web3.eth.Contract(Artifacts.IERC721.abi, address)
        const ownerOf = yield* call(IERC721.methods.ownerOf, 1)
        if (ownerOf != undefined) {
            //Pseudo-ethcall (used for filtering)
            yield* put(EthCallCRUD.actions.create({
                networkId,
                to: address,
                data: '0x',
                methodName: 'supportsInterface',
                args: [interfaces.IERC721.interfaceId],
                returnValue: true
            }))
            try {
                const IERC721Metadata = new web3.eth.Contract(Artifacts.IERC721Metadata.abi, address)
                const tokenUri = yield* call(IERC721Metadata.methods.tokenUri, 1)
                if (tokenUri != undefined) {
                    //Pseudo-ethcall (used for filtering)
                    yield* put(EthCallCRUD.actions.create({
                        networkId,
                        to: address,
                        data: '0x',
                        methodName: 'supportsInterface',
                        args: [interfaces.IERC721Metadata.interfaceId],
                        returnValue: true
                    }))
                    //Update to IERC721Metadata
                    return {
                        abi: Artifacts.IERC721Metadata.abi,
                        interfaceIds: [
                            interfaces.IERC721.interfaceId,
                            interfaces.IERC721Metadata.interfaceId
                        ]
                    }
                }
            } catch { }

            //Update to IERC721
            return { abi: Artifacts.IERC721.abi, interfaceIds: [interfaces.IERC721.interfaceId] }
        }
    } catch { }

    //IERC1155
    try {
        const IERC1155 = new web3.eth.Contract(Artifacts.IERC1155.abi, address)
        const balanceOf = yield* call(IERC1155.methods.balanceOf(ADDRESS_1, 1))
        if (balanceOf != undefined) {
            //Pseudo-ethcall (used for filtering)
            yield* put(EthCallCRUD.actions.create({
                networkId,
                to: address,
                data: '0x',
                methodName: 'supportsInterface',
                args: [interfaces.IERC1155.interfaceId],
                returnValue: true
            }))
            try {
                const IERC1155MetadataURI = new web3.eth.Contract(Artifacts.IERC1155MetadataURI.abi, address)
                const uri = yield* call(IERC1155MetadataURI.methods.uri, 1)
                if (uri != undefined) {
                    //Pseudo-ethcall (used for filtering)
                    yield* put(EthCallCRUD.actions.create({
                        networkId,
                        to: address,
                        data: '0x',
                        methodName: 'supportsInterface',
                        args: [interfaces.IERC1155MetadataURI.interfaceId],
                        returnValue: true
                    }))
                    //IERC1155MetadataURI
                    return {
                        abi: Artifacts.IERC1155MetadataURI.abi,
                        interfaceIds: [
                            interfaces.IERC1155.interfaceId,
                            interfaces.IERC1155MetadataURI.interfaceId
                        ]
                    }
                }
            } catch { }
            return { abi: Artifacts.IERC1155.abi, interfaceIds: [interfaces.IERC1155.interfaceId] }
        }
    } catch { }

    return { abi: [], interfaceIds: [] }
}


/** @category Sagas */
export function* inferInterfaceSaga(action: InferInterfaceAction): Generator<any, any> {
    const { payload } = action;
    const { networkId, address } = payload;

    const contract = yield* call(ContractCRUD.db.get, { networkId, address })
    if (contract?.abi) return; //ABI Known

    const { abi, interfaceIds } = yield* call(inferInterface, networkId, address)
    if (abi.length > 0) {
        yield* put(ContractCRUD.actions.update({ networkId, address, abi, interfaceIds }))
    }

    return { abi, interfaceIds }
}
