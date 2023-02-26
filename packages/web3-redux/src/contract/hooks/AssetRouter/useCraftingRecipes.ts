import { interfaces, Web3 } from "@owlprotocol/contracts"
import { Web3ContractMethodCall, Web3ContractMethodParams } from "@owlprotocol/contracts/lib/types/web3/types"
import { flatten } from 'lodash-es'
import EthCallCRUD from "../../../ethcall/crud"
import { EthCall, EthCallIndexInput } from "../../../ethcall/model/interface"
import { useContractsWithInterfaceIds } from "../useContractsWithInterfaceIds"

export function useInputRouterBaskets(filter?: {
    networkIds?: string[],
    inputRouters?: string[],
    inputBasketIdx?: string[],
}) {
    const inputRoutersAddress = new Set(filter?.inputRouters)
    const [inputRouters] = useContractsWithInterfaceIds([interfaces.IAssetRouterInput.interfaceId], filter?.networkIds)
    const inputRoutersByAddress = filter?.inputRouters && filter?.inputRouters.length > 0 ?
        inputRouters.filter((r) => inputRoutersAddress.has(r.address)) : inputRouters
    const inputRouterBasketsFilter: EthCallIndexInput[] = flatten(inputRoutersByAddress.map(({ networkId, address }) => {
        const f = {
            networkId,
            to: address,
            methodName: 'getBasket',
        }
        if (filter?.inputBasketIdx) {
            return filter.inputBasketIdx.map((basketIdx) => { return { ...f, argsHash: JSON.stringify({ basketIdx }) } })
        }
        return [f]
    }))
    const [inputRouterBaskets] = EthCallCRUD.hooks.useWhereMany(inputRouterBasketsFilter);
    return flatten(inputRouterBaskets) as EthCall<
        Web3ContractMethodParams<Web3.IAssetRouterInput, "getBasket">,
        Web3ContractMethodCall<Web3.IAssetRouterInput, "getBasket">
    >[]
}

export function useOutputRouterBaskets(filter?: {
    networkIds?: string[],
    outputRouters?: string[],
    outputBasketIdx?: string[],
}) {
    const outputRoutersAddress = new Set(filter?.outputRouters)
    const [outputRouters] = useContractsWithInterfaceIds([interfaces.IAssetRouterOutput.interfaceId], filter?.networkIds)
    const outputRoutersByAddress = filter?.outputRouters && filter?.outputRouters.length > 0 ?
        outputRouters.filter((r) => outputRoutersAddress.has(r.address)) : outputRouters
    const outputRouterBasketsFilter: EthCallIndexInput[] = flatten(outputRoutersByAddress.map(({ networkId, address }) => {
        const f = {
            networkId,
            to: address,
            methodName: 'getBasket',
        }
        if (filter?.outputBasketIdx) {
            return filter.outputBasketIdx.map((basketIdx) => { return { ...f, argsHash: JSON.stringify({ basketIdx }) } })
        }
        return [f]
    }))
    const [outputRouterBaskets] = EthCallCRUD.hooks.useWhereMany(outputRouterBasketsFilter);
    return flatten(outputRouterBaskets) as EthCall<
        Web3ContractMethodParams<Web3.IAssetRouterOutput, "getBasket">,
        Web3ContractMethodCall<Web3.IAssetRouterOutput, "getBasket">
    >[]
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
