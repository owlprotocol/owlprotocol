import Contracts, { interfaceIdNames, InterfaceName, Utils } from '@owlprotocol/contracts';
import type { Web3ContractMethodParams } from '@owlprotocol/contracts/lib/types/web3/types.js';
import { isEqual, uniq } from 'lodash-es';
import { Action } from 'redux';
import { all, call, put, select } from 'typed-redux-saga'

import ConfigCRUD from '../../config/crud.js';
import { fetchSaga as fetchConfigSaga } from '../../config/sagas/fetch.js'

import { call as callAction, inferInterfaceAction } from '../actions/index.js';
import { ContractCRUD } from '../crud.js';
import {
    eventGetPastAssetRouterSupportsInputAsset,
    eventGetPastAssetRouterSupportsOutputAsset,
} from '../../contracteventquery/sagas/eventGetPast.js';
import {
    eventGetPastAction
} from '../../contracteventquery/actions/eventGetPast.js'
import { eventSubscribeAction } from '../../contracteventsubscribe/actions/index.js';
import { getERC721TokenIds } from '../db/ERC721/getERC721TokenIds.js';
import { getERC1155TokenIds } from '../db/ERC1155/getERC1155TokenIds.js';

//Handle contract creation
export function* dbCreatingSaga(action: ReturnType<typeof ContractCRUD.actions.dbCreating>): Generator<
    any,
    any
> {
    //Handle contract creation
    const { payload } = action;
    const { networkId, address, abi } = payload.obj
    const interfaceIds = payload.obj.interfaceIds ?? []
    const interfaceNamesSet = new Set(interfaceIds.map((interfaceId) => interfaceIdNames[interfaceId])) as Set<InterfaceName>
    let code = payload.obj.code

    const { config } = yield* call(fetchConfigSaga, ConfigCRUD.actions.fetch({ id: '0' }))
    const account = config?.account

    if (abi) {
        //Redux
        yield* put(ContractCRUD.actions.reduxUpsert({ networkId, address, abi }))
        yield* call(fetchContractData, networkId, address, account, interfaceNamesSet)
    } else {
        //Infer
        yield* put(inferInterfaceAction({ networkId, address }))
    }
}

export function* dbUpdatingSaga(action: ReturnType<typeof ContractCRUD.actions.dbUpdating>): Generator<
    any,
    any
> {

    //Handle contract creation
    const { payload } = action;
    const { networkId, address } = payload.obj
    const { abi } = payload.mods;
    const interfaceIds = payload.mods.interfaceIds ?? payload.obj.interfaceIds ?? []
    const interfaceNamesSet = new Set(interfaceIds.map((interfaceId) => interfaceIdNames[interfaceId])) as Set<InterfaceName>

    const { config } = yield* call(fetchConfigSaga, ConfigCRUD.actions.fetch({ id: '0' }))
    const account = config?.account

    if (abi) {
        //Redux
        const reduxSelected = yield* select(ContractCRUD.selectors.selectByIdSingle, { networkId, address });
        if (!isEqual(abi, reduxSelected?.abi)) {
            yield* put(ContractCRUD.actions.reduxUpsert({ networkId, address, abi }))
        }
        yield* call(fetchContractData, networkId, address, account, interfaceNamesSet)
    } else if (!payload.obj.abi) {
        //Infer
        yield* put(inferInterfaceAction({ networkId, address }))
    }
}

export function* dbDeletingSaga(action: ReturnType<typeof ContractCRUD.actions.dbDeleting>): Generator<
    any,
    any
> {
    const { payload } = action;
    if (payload.obj) {
        const { networkId, address } = payload.obj
        yield* put(ContractCRUD.actions.reduxDelete({ networkId, address }))
    }
}

//Handle contract creation
export function* fetchContractData(networkId: string, address: string, account: string | undefined, interfaceNamesSet: Set<InterfaceName>): Generator<
    any,
    any
> {
    //console.debug({ interfaceNamesSet })
    const actions: Action[] = []

    //Handle interface
    if (interfaceNamesSet.has('IERC1820')) {
        const { actions: actionsERC1820 } = fetchERC1820(networkId, address)
        actions.push(...actionsERC1820)
    }

    if (interfaceNamesSet.has('IRouterReceiver')) {
        //ignore
        //TODO: Check common router receivers
    }
    if (interfaceNamesSet.has('IERC2981')) actions.push(...fetchERC2981(networkId, address).actions)
    if (interfaceNamesSet.has('IContractURI')) actions.push(...fetchContractURI(networkId, address).actions)
    if (interfaceNamesSet.has('IAccessControl')) actions.push(...fetchAccessControl(networkId, address).actions)

    if (interfaceNamesSet.has('IERC20')) {
        const { actions: actionsERC20 } = fetchERC20(networkId, address, account)
        actions.push(...actionsERC20)
        if (interfaceNamesSet.has('IERC20Metadata')) {
            actions.push(...fetchERC20Metadata(networkId, address).actions)
        }
    }

    if (interfaceNamesSet.has('IERC721')) {
        const { actions: actionsERC721, tokens } = yield* call(fetchERC721, networkId, address, account)
        actions.push(...actionsERC721)
        if (interfaceNamesSet.has('IERC721Metadata')) {
            const { actions: actionsERC721Metadata } = fetchERC721Metadata(networkId, address, tokens)
            actions.push(...actionsERC721Metadata)
        }
        if (interfaceNamesSet.has('IERC721TopDown')) {
            const { actions: actionsERC721TopDown } = fetchERC721TopDown(networkId, address)
            actions.push(...actionsERC721TopDown)
        }
        if (interfaceNamesSet.has('IERC721Dna')) {
            actions.push(...fetchERC721Dna(networkId, address, tokens).actions)
        }
    }

    if (interfaceNamesSet.has('IERC1155')) {
        const { actions: actionsERC1155, tokens } = yield* call(fetchERC1155, networkId, address, account)
        actions.push(...actionsERC1155)

        if (interfaceNamesSet.has('IERC1155MetadataURI')) {
            actions.push(
                callAction<Web3ContractMethodParams<Contracts.Web3.IERC1155MetadataURI, 'uri'>>({ networkId, address, method: 'uri' }),
            )
        }
        if (interfaceNamesSet.has('IERC1155Dna')) {
            actions.push(...fetchERC1155Dna(networkId, address, tokens).actions)
        }
    }

    if (interfaceNamesSet.has('IAssetRouterCraft')) {
        const result = yield* call(fetchAssetRouterCraft, networkId, address, account)
        actions.push(...result.actions)
    }

    if (interfaceNamesSet.has('IAssetRouterInput')) {
        const result = yield* call(fetchAssetRouterInput, networkId, address, account)
        actions.push(...result.actions)
    }

    if (interfaceNamesSet.has('IAssetRouterOutput')) {
        const result = yield* call(fetchAssetRouterOutput, networkId, address, account)
        actions.push(...result.actions)
    }

    yield* all(actions.map((a) => put(a)))
}

export function fetchERC1820(networkId: string, address: string): {
    actions: Action[]
} {
    const actions: Action[] = []
    actions.push(
        eventGetPastAction({ networkId, address, eventName: 'InterfaceImplementerSet' }),
        eventSubscribeAction({ networkId, address, eventName: 'InterfaceImplementerSet' })
    )
    return { actions }
}

export function fetchERC2981(networkId: string, address: string): {
    actions: Action[]
} {
    const actions: Action[] = []
    actions.push(
        callAction<Web3ContractMethodParams<Contracts.Web3.IERC2981, 'royaltyInfo'>>({ networkId, address, method: 'royaltyInfo', args: [1, 10000], maxCacheAge: Number.MAX_SAFE_INTEGER }),
    )
    return { actions }
}

export function fetchContractURI(networkId: string, address: string): {
    actions: Action[]
} {
    const actions: Action[] = []
    actions.push(
        callAction<Web3ContractMethodParams<Contracts.Web3.IContractURI, 'contractURI'>>({ networkId, address, method: 'contractURI', maxCacheAge: Number.MAX_SAFE_INTEGER }),
    )
    return { actions }
}

export function fetchAccessControl(networkId: string, address: string): {
    actions: Action[]
} {
    const actions: Action[] = []
    actions.push(
        eventGetPastAction<Contracts.Web3.RoleAdminChangedEvent['returnValues']>({ networkId, address, eventName: 'RoleAdminChanged' }),
        eventGetPastAction<Contracts.Web3.RoleGrantedEvent['returnValues']>({ networkId, address, eventName: 'RoleGranted' }),
        eventGetPastAction<Contracts.Web3.RoleRevokedEvent['returnValues']>({ networkId, address, eventName: 'RoleRevoked' }),
    )
    return { actions }
}

export function fetchERC20(networkId: string, address: string, account: string | undefined): {
    actions: Action[]
} {
    const actions: Action[] = []
    if (account) {
        actions.push(
            callAction<Web3ContractMethodParams<Contracts.Web3.IERC20, 'balanceOf'>>({ networkId, address, method: 'balanceOf', args: [account] }),
        )
    }
    return { actions }
}

export function fetchERC20Metadata(networkId: string, address: string): {
    actions: Action[]
} {
    const actions: Action[] = []
    actions.push(
        callAction<Web3ContractMethodParams<Contracts.Web3.IERC20Metadata, 'name'>>({ networkId, address, method: 'name', maxCacheAge: Number.MAX_SAFE_INTEGER }),
        callAction<Web3ContractMethodParams<Contracts.Web3.IERC20Metadata, 'symbol'>>({ networkId, address, method: 'symbol', maxCacheAge: Number.MAX_SAFE_INTEGER }),
        callAction<Web3ContractMethodParams<Contracts.Web3.IERC20Metadata, 'decimals'>>({ networkId, address, method: 'decimals', maxCacheAge: Number.MAX_SAFE_INTEGER }),
        callAction<Web3ContractMethodParams<Contracts.Web3.IERC20Metadata, 'totalSupply'>>({ networkId, address, method: 'totalSupply', maxCacheAge: Number.MAX_SAFE_INTEGER })
    )
    return { actions }
}

export function* fetchERC721(networkId: string, address: string, account: string | undefined): Generator<any, {
    actions: Action[]
    tokens: string[]
}> {
    const actions: Action[] = []
    const tokens = yield* call(getERC721TokenIds, networkId, address)
    actions.push(...tokens.map((tokenId) => callAction<Web3ContractMethodParams<Contracts.Web3.IERC721, 'ownerOf'>>({ networkId, address, args: [tokenId] })))

    if (account) {
        actions.push(
            callAction<Web3ContractMethodParams<Contracts.Web3.IERC721, 'balanceOf'>>({ networkId, address, method: 'balanceOf', args: [account] }),
        )
    }
    return { actions, tokens }
}

export function fetchERC721Metadata(networkId: string, address: string, tokens: string[]): {
    actions: Action[],
} {
    const actions: Action[] = []
    actions.push(
        callAction<Web3ContractMethodParams<Contracts.Web3.IERC721Metadata, 'name'>>({ networkId, address, method: 'name', maxCacheAge: Number.MAX_SAFE_INTEGER }),
        callAction<Web3ContractMethodParams<Contracts.Web3.IERC721Metadata, 'symbol'>>({ networkId, address, method: 'symbol', maxCacheAge: Number.MAX_SAFE_INTEGER }),
        ...tokens.map((tokenId) => {
            return callAction<Web3ContractMethodParams<Contracts.Web3.IERC721Metadata, 'tokenURI'>>({ networkId, address, method: 'tokenURI', args: [tokenId], maxCacheAge: 0 })
        })
    )
    return { actions }
}

export function fetchERC721TopDown(networkId: string, address: string): {
    actions: Action[]
} {
    const actions: Action[] = []
    actions.push(callAction<Web3ContractMethodParams<Contracts.Web3.IERC721TopDown, 'getChildContracts'>>({ networkId, address, method: 'getChildContracts', maxCacheAge: Number.MAX_SAFE_INTEGER }))
    return { actions }
}

export function fetchERC721Dna(networkId: string, address: string, tokens: string[]): {
    actions: Action[]
} {
    const actions: Action[] = []
    actions.push(
        ...tokens.map((tokenId) => callAction<Web3ContractMethodParams<Contracts.Web3.IERC721Dna, 'getDna'>>({ networkId, address, method: 'getDna', args: [tokenId], maxCacheAge: 0 }))
    )
    return { actions }
}

export function* fetchERC1155(networkId: string, address: string, account: string | undefined): Generator<any, {
    actions: Action[]
    tokens: string[]
}> {
    const actions: Action[] = []
    const tokens = yield* call(getERC1155TokenIds, networkId, address)
    if (account) {
        actions.push(...tokens.map((tokenId) => callAction<Web3ContractMethodParams<Contracts.Web3.IERC1155, 'balanceOf'>>({ networkId, address, args: [account, tokenId], maxCacheAge: 0 })))
    }
    return { actions, tokens }
}

export function fetchERC1155Dna(networkId: string, address: string, tokens: string[]): {
    actions: Action[]
} {
    const actions: Action[] = []
    actions.push(...tokens.map((tokenId) => {
        return callAction<Web3ContractMethodParams<Contracts.Web3.IERC1155Dna, 'getDna'>>({ networkId, address, method: 'getDna', args: [tokenId], maxCacheAge: 0 })
    }))
    return { actions }
}

export function* fetchAssetRouterCraft(networkId: string, address: string, account: string | undefined): Generator<any, {
    actions: Action[]
}> {
    //Actions to dispatch
    const actions: Action[] = []
    if (account) {
        actions.push(
            eventGetPastAction<Contracts.Web3.RouteBasket['returnValues']>({ networkId, address, eventName: 'RouteBasket', filter: { from: account } }),
            eventSubscribeAction<Contracts.Web3.RouteBasket['returnValues']>(({ networkId, address, eventName: 'RouteBasket', filter: { from: account } }))
        )
    }
    //Add supported assets
    const SupportsInputAsset = yield* call(eventGetPastAssetRouterSupportsInputAsset, eventGetPastAction<Contracts.Web3.SupportsInputAsset['returnValues']>({ networkId, address }))
    const SupportsOutputAsset = yield* call(eventGetPastAssetRouterSupportsOutputAsset, eventGetPastAction<Contracts.Web3.SupportsOutputAsset['returnValues']>({ networkId, address }))
    //Baskets
    const inputBaskets = uniq(SupportsInputAsset.map((e) => e.returnValues?.basketIdx as string))
    const outputBaskets = uniq(SupportsOutputAsset.map((e) => e.returnValues?.basketIdx as string))
    actions.push(...inputBaskets.map((basketIdx) => {
        return callAction<Web3ContractMethodParams<Contracts.Web3.IAssetRouterCraft, 'getInputBasket'>>({ networkId, address, method: 'getInputBasket', args: [basketIdx], maxCacheAge: 0 })
    }))
    actions.push(...outputBaskets.map((basketIdx) => {
        return callAction<Web3ContractMethodParams<Contracts.Web3.IAssetRouterCraft, 'getOutputBasket'>>({ networkId, address, method: 'getOutputBasket', args: [basketIdx], maxCacheAge: 0 })
    }))
    //Tokens
    const tokens = uniq([...SupportsInputAsset, ...SupportsOutputAsset].map((e) => e.returnValues?.contractAddr! as string))
    //TODO: What is behaviour if asset already exists?
    actions.push(...tokens.map((t) => ContractCRUD.actions.create({ networkId, address: t })))

    return { actions }
}

export function* fetchAssetRouterInput(networkId: string, address: string, account: string | undefined): Generator<any, {
    actions: Action[]
}> {
    //Actions to dispatch
    const actions: Action[] = []
    if (account) {
        actions.push(
            eventGetPastAction<Contracts.Web3.RouteBasket['returnValues']>({ networkId, address, eventName: 'RouteBasket', filter: { from: account } }),
            eventSubscribeAction<Contracts.Web3.RouteBasket['returnValues']>(({ networkId, address, eventName: 'RouteBasket', filter: { from: account } }))
        )
    }
    //Add supported assets
    const SupportsInputAsset = yield* call(eventGetPastAssetRouterSupportsInputAsset, eventGetPastAction<Contracts.Web3.SupportsInputAsset['returnValues']>({ networkId, address }))
    //Baskets
    const inputBaskets = uniq(SupportsInputAsset.map((e) => e.returnValues?.basketIdx as string))
    actions.push(...inputBaskets.map((basketIdx) => {
        return callAction<Web3ContractMethodParams<Contracts.Web3.IAssetRouterInput, 'getInputBasket'>>({ networkId, address, method: 'getInputBasket', args: [basketIdx], maxCacheAge: 0 })
    }))
    const tokens = uniq(SupportsInputAsset.map((e) => e.returnValues?.contractAddr!))
    //Tokens
    //TODO: What is behaviour if asset already exists?
    actions.push(...tokens.map((t) => ContractCRUD.actions.create({ networkId, address: t })))

    return { actions }
}

export function* fetchAssetRouterOutput(networkId: string, address: string, account: string | undefined): Generator<any, {
    actions: Action[]
}> {
    //Actions to dispatch
    const actions: Action[] = []
    if (account) {
        actions.push(
            eventGetPastAction<Contracts.Web3.RouteBasket['returnValues']>({ networkId, address, filter: { to: account } }),
            eventSubscribeAction<Contracts.Web3.RouteBasket['returnValues']>({ networkId, address, eventName: 'RouteBasket', filter: { to: account } })
        )
    }
    //Add supported assets
    const SupportsOutputAsset = yield* call(eventGetPastAssetRouterSupportsOutputAsset, eventGetPastAction<Contracts.Web3.SupportsOutputAsset['returnValues']>({ networkId, address }))
    //Baskets
    const outputBaskets = uniq(SupportsOutputAsset.map((e) => e.returnValues?.basketIdx as string))
    actions.push(...outputBaskets.map((basketIdx) => {
        return callAction<Web3ContractMethodParams<Contracts.Web3.IAssetRouterOutput, 'getOutputBasket'>>({ networkId, address, method: 'getOutputBasket', args: [basketIdx], maxCacheAge: 0 })
    }))
    //Tokens
    const tokens = uniq(SupportsOutputAsset.map((e) => e.returnValues?.contractAddr!))
    //TODO: What is behaviour if asset already exists?
    actions.push(...tokens.map((t) => ContractCRUD.actions.create({ networkId, address: t })))

    return { actions }
}

