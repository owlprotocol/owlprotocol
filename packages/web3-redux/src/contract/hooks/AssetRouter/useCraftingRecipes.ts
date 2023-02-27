import { interfaces, Web3 } from "@owlprotocol/contracts"
import { Web3ContractMethodCall, Web3ContractMethodParams } from "@owlprotocol/contracts/lib/types/web3/types"
import { flatten } from 'lodash-es'
import EthCallCRUD from "../../../ethcall/crud"
import { EthCall, EthCallIndexInput } from "../../../ethcall/model/interface"
import { useContractsWithInterfaceIds } from "../useContractsWithInterfaceIds"

export function useInputBaskets(filter?: {
    contracts: { networkId: string, address: string }[],
    basketIdx?: string[]
}) {
    const basketsFilter: EthCallIndexInput[] = flatten(filter?.contracts.map(({ networkId, address }) => {
        const f: EthCallIndexInput = {
            networkId,
            to: address,
            methodName: 'getInputBasket',
        }
        if (filter?.basketIdx) {
            return filter.basketIdx.map((basketIdx) => { return { ...f, argsHash: JSON.stringify({ basketIdx }) } })
        }
        return [f]
    }))
    const [baskets] = EthCallCRUD.hooks.useWhereMany(basketsFilter);
    return flatten(baskets) as EthCall<
        Web3ContractMethodParams<Web3.IAssetRouterInput, "getInputBasket">,
        Web3ContractMethodCall<Web3.IAssetRouterInput, "getInputBasket">
    >[]
}

export function useOutputBaskets(filter?: {
    contracts: { networkId: string, address: string }[],
    basketIdx?: string[]
}) {
    const basketsFilter: EthCallIndexInput[] = flatten(filter?.contracts.map(({ networkId, address }) => {
        const f: EthCallIndexInput = {
            networkId,
            to: address,
            methodName: 'getOutputBaskets',
        }
        if (filter?.basketIdx) {
            return filter.basketIdx.map((basketIdx) => { return { ...f, argsHash: JSON.stringify({ basketIdx }) } })
        }
        return [f]
    }))
    const [baskets] = EthCallCRUD.hooks.useWhereMany(basketsFilter);
    return flatten(baskets) as EthCall<
        Web3ContractMethodParams<Web3.IAssetRouterOutput, "getOutputBasket">,
        Web3ContractMethodCall<Web3.IAssetRouterOutput, "getOutputBasket">
    >[]
}

export function useCraftRouterBaskets(filter?: {
    networkIds?: string[],
    address?: string[],
    inputBasketIdx?: string[],
    outputBasketIdx?: string[]
}) {
    const addressSet = new Set(filter?.address)
    const [contracts] = useContractsWithInterfaceIds([interfaces.IAssetRouterCraft.interfaceId], filter?.networkIds)
    const contractsByAddress = filter?.address && filter?.address.length > 0 ?
        contracts.filter((r) => addressSet.has(r.address)) : contracts
    const inputBaskets = useInputBaskets({ contracts: contractsByAddress, basketIdx: filter?.inputBasketIdx })
    const outputBaskets = useOutputBaskets({ contracts: contractsByAddress, basketIdx: filter?.outputBasketIdx })
    return { inputBaskets, outputBaskets }
}

export function useInputRouterBaskets(filter?: {
    networkIds?: string[],
    address?: string[],
    inputBasketIdx?: string[],
}) {
    const addressSet = new Set(filter?.address)
    const [contracts] = useContractsWithInterfaceIds([interfaces.IAssetRouterInput.interfaceId], filter?.networkIds)
    const contractsByAddress = filter?.address && filter?.address.length > 0 ?
        contracts.filter((r) => addressSet.has(r.address)) : contracts
    const inputBaskets = useInputBaskets({ contracts: contractsByAddress, basketIdx: filter?.inputBasketIdx })
    return { inputBaskets }
}

export function useOutputRouterBaskets(filter?: {
    networkIds?: string[],
    address?: string[],
    outputBasketIdx?: string[]
}) {
    const addressSet = new Set(filter?.address)
    const [contracts] = useContractsWithInterfaceIds([interfaces.IAssetRouterCraft.interfaceId], filter?.networkIds)
    const contractsByAddress = filter?.address && filter?.address.length > 0 ?
        contracts.filter((r) => addressSet.has(r.address)) : contracts
    const outputBaskets = useOutputBaskets({ contracts: contractsByAddress, basketIdx: filter?.outputBasketIdx })

    return { outputBaskets }
}

interface Crafting {
    inputRouter: string,
    outputRouter: string,
    inputBasketId: string,
    outputBasketId: string,
    inputBasket: {

    },
    inputBasketOwned: {

    },
    outputBasket: any,
}

interface CraftingRecipesFilter {
    networkIds?: string[],
    inputRouters?: string[],
    outputRouters?: string[]
    inputBasketIds?: string[],
    outputBasketIds?: string[],
}
export function useCraftingRecipes(filter?: CraftingRecipesFilter) {
    //networkId, address, balanceOf(account, tokenId)
    const inputBaskets = useInputRouterBaskets(filter)
    const outputBaskets = useOutputRouterBaskets(filter)
    //Get AssetRouterInput roles

    //Load Input
    //Load Output
    //Crafting
}
