import {TransactionResponse} from "@ethersproject/abstract-provider";
import {abisWithZod as abisWithZodContracts} from "@owlprotocol/contracts";
import {abisWithZod as abisWithZodProxiesContracts} from "@owlprotocol/contracts-proxy";
import type {AbiFunctionWithZod, TypechainFactoryWithZod} from "@owlprotocol/zod-sol";
import * as ZodSol from "@owlprotocol/zod-sol";
import {functionParamsObjToTuple, functionParamsTupleToObj} from "@owlprotocol/zod-sol";
import {ContractFactory} from "ethers";
import type {Result} from "ethers/lib/utils.js";
import {mapValues, omit} from "lodash-es";
import {z} from "zod";
import {getProvider, getSigner} from "../providers.js";
import {protectedProcedure, t} from "../trpc.js";

/**
 * 2. Additional ideas
 *      * Have an additional object with similar schema and merge it for descriptions
 *      * Future: Use event abis to generate subscription/query endpoints
 */

export function generatePOSTForAbiFunctionRead<
    Factory extends ContractFactory,
    Method extends AbiFunctionWithZod
>
(contractName: string, factory: Factory, method: Method) {
    const methodParametersJoined = method.inputs.map(input => input.name).join(",")

    return protectedProcedure
        .meta({
            openapi: {
                method: "POST" as const,
                path: `/{networkId}/abi/${contractName}/{address}/${method.name}` as const,
                protect: true,
                description: `Read \`${method.name}(${methodParametersJoined})\` on an instance of \`${contractName}\``,
                summary: `${contractName}.${method.name}`,
                tags: [contractName],
            },
        })
        //.input(method.inputsZod.extend(ZodSol.contractAddressZod.shape))
        .input(ZodSol.contractAddressZod.extend({
            contractParams: method.inputsZod
        }))
        .output(z.object({
            contractParams: method.inputsZod,
            result: method.outputsZod
        }))
        //.output(z.any())
        .mutation(async ({ input }) => {
            //Parse parameters obj to tuple
            const parameters = functionParamsObjToTuple(input.contractParams, method.inputs)

            if (method.stateMutability === "pure" || method.stateMutability === "view") {
                //Get provider
                const provider = getProvider(input.networkId);
                //TODO: Investigate factory is a function now
                //Instantiate new contract using provider, abi, address
                const contract = factory.attach(input.address).connect(provider)
                //Call contract
                const resultArr: Result = await contract.functions[method.name](...parameters)
                const result = functionParamsTupleToObj(resultArr, method.outputs);
                //4.a Return data
                return {
                    contractParams: input.contractParams,
                    result
                }
            }
           else {
                throw new Error(`Invalid method.stateMutability ${method.stateMutability}`)
            }
        });
}

export function generatePOSTForAbiFunctionWrite<
    Factory extends ContractFactory,
    Method extends AbiFunctionWithZod
>
(contractName: string, factory: Factory, method: Method) {
    const methodParametersJoined = method.inputs.map(input => input.name).join(",")

    return protectedProcedure
        .meta({
            openapi: {
                method: "POST" as const,
                path: `/{networkId}/abi/${contractName}/{address}/${method.name}` as const,
                protect: true,
                description: `Write \`${method.name}(${methodParametersJoined})\` on an instance of \`${contractName}\``,
                summary: `${contractName}.${method.name}`,
                tags: [contractName],
            },
        })
        //.input(method.inputsZod.extend(ZodSol.contractAddressZod.shape))
        .input(ZodSol.contractAddressZod.extend({
            contractParams: method.inputsZod
        }))
        .output(z.object({
            contractParams: method.inputsZod,
            txHash: z.string(),
        }))
        .mutation(async ({ input }) => {
            //Parse parameters obj to tuple
            const parameters = functionParamsObjToTuple(input.contractParams, method.inputs)

           if (method.stateMutability === "payable" || method.stateMutability === "nonpayable") {
                //Get signer
                const signer = getSigner(input.networkId);
                //Instantiate new contract using provider, abi, address
                const contract = factory.attach(input.address).connect(signer)

                //value
                //TODO: Read parameter
                // const value = 0
                //wallet address
                const from = await signer.getAddress()
                //
                // //get gas estimate, get gas price (params or default), send tx
                const gasLimit = await contract.estimateGas[method.name](...parameters, {from})
                //nonce
                //TODO: Read parameter
                const nonce = await signer.provider!.getTransactionCount(from)
                // //TODO: Custom gas oracle?
                // const gasPrice = utils.formatUnits("100", "gwei")

                //returns <Result> type
                //https://docs.ethers.org/v5/api/utils/abi/interface/#Result
               
               // TODO: fix overrides. Value is an issue
                // const tx: TransactionResponse = await contract[method.name](...parameters, {  value, from, nonce, gasLimit, gasPrice})
                const tx: TransactionResponse = await contract[method.name](...parameters, {from, nonce, gasLimit})
                //4.b Return tx hash, and receipt
                const txHash = tx.hash;

                return {
                    contractParams: input.contractParams,
                    txHash
                }
            } else {
                throw new Error(`Invalid method.stateMutability ${method.stateMutability}`)
            }
        });
}

/*
    1. Conditional on name === initialize (ignore)
    2. Generate deploy procedure
*/
//TODO: Consider using GET request for read functions
type ProcedureForAbiFunction<
    Factory extends ContractFactory,
    Method extends AbiFunctionWithZod
> = Method["stateMutability"] extends "view" | "pure" ?
    ReturnType<typeof generatePOSTForAbiFunctionRead<Factory, Method>> :
    ReturnType<typeof generatePOSTForAbiFunctionWrite<Factory, Method>>
export function generateProcedureForFunction<
    Factory extends ContractFactory,
    Method extends AbiFunctionWithZod
>(contractName: string, factory: Factory, method: Method): ProcedureForAbiFunction<Factory, Method> {
    switch (method.stateMutability) {
        case "view":
        case "pure":
            return generatePOSTForAbiFunctionRead(contractName, factory, method) as any;
        case "nonpayable":
        case "payable":
            return generatePOSTForAbiFunctionWrite(contractName, factory, method) as any;
    }
}

/**
 * Generate router for all of a smart contract's functions
 */
export type RouterForContractAbi<T extends TypechainFactoryWithZod> = ReturnType<typeof t.router<{
    //@ts-expect-error
    [K in keyof Omit<T["methods"], "initialize">]: ReturnType<typeof generateProcedureForFunction<T["factory"], T["methods"][K]>>
}>>
export function generateRouterForFactory<T extends TypechainFactoryWithZod>(contractName: string, factoryObj: T): RouterForContractAbi<T> {
    //@ts-expect-error
    return t.router(mapValues(omit(factoryObj.methods, "initialize"), (method) => generateProcedureForFunction(contractName, factoryObj.factory, method)))
}

/**
 * Generate root router for /abi route
 */
export type RouterAbi<T extends Record<string, TypechainFactoryWithZod>> = ReturnType<typeof t.router<{
    [K in keyof T]: ReturnType<typeof generateRouterForFactory<T[K]>>
}>>
export function generateContractRouter<T extends Record<string, TypechainFactoryWithZod>>(factoriesObj: T): RouterAbi<T> {
    return t.router(mapValues(factoriesObj, (item, k) => generateRouterForFactory(k, item))) as any
}

type FactoriesWithZod = typeof abisWithZodProxiesContracts & typeof abisWithZodContracts
export const abiRouter: RouterAbi<FactoriesWithZod> = generateContractRouter<FactoriesWithZod>({
    ...abisWithZodProxiesContracts,
    ...abisWithZodContracts
})
