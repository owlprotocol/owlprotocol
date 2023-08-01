import {abisWithZod as abisWithZodContracts} from "@owlprotocol/contracts";
import {abisWithZod as abisWithZodProxiesContracts, DeploymentArgs, FactoryWithInitializeUtil} from "@owlprotocol/contracts-proxy";
import type {AbiFunctionWithZod, TypechainFactoryWithZod} from "@owlprotocol/zod-sol";
import * as ZodSol from "@owlprotocol/zod-sol";
import {mapKeys, mapValues, pickBy} from "lodash-es";
import {z} from "zod";
import {getSigner} from "../providers.js";
import {protectedProcedure, t} from "../trpc.js";
import {deployParamsZod} from "../zodValidators/deploymentMethod.js";

export function generatePOSTForDeploy<
    Factory extends FactoryWithInitializeUtil,
    Method extends AbiFunctionWithZod
>
(contractName: string, factory: Factory, method: Method) {
    return protectedProcedure
        .meta({
            openapi: {
            method: "POST" as const,
            path: `/{networkId}/deploy/${contractName}` as const,
            protect: true,
            description: `Deploys an instance of \`${contractName}\``,
            summary: `Deploy ${contractName}`,
            tags: ["Deploy"],
            example: {
                request: {contractParams: {_admin: "0x434c7df2f06d6cd172a28cb71e2afe6e1b974dbc"}}
            }
        },
        })
        //.input(method.inputsZod.extend(ZodSol.contractAddressZod.shape))
        .input(ZodSol.networkIdZod.extend({
            deployParams: deployParamsZod,
            contractParams: method.inputsZod
        }))
        .output(z.any())
        .mutation(async ({ input }) => {
            //Get signer
            const signer = getSigner(input.networkId);
            /*
            //value
            //TODO: Read parameter
            const value = "0"
            //wallet address
            const from = await signer.getAddress()
            //get gas estimate, get gas price (params or default), send tx
            //TODO: Get gas estimate
            const gasLimit = 2000000
            //nonce
            //TODO: Read parameter
            const nonce = await signer.provider!.getTransactionCount(from)
            //TODO: Custom gas oracle?
            const gasPrice = utils.formatUnits("100", "gwei")
            const overrides = { from, nonce, gasPrice }
            */

            const contractParams = mapKeys(input.contractParams, (_, k: string) => {
                return k.startsWith("_") ? k.replace("_", "") : k;
            })
            console.debug({ contractParams, deployParams: input.deployParams })
            //TODO: Fix overrides, breaks factory
            const result = await factory.deploy(contractParams, input.deployParams as DeploymentArgs, signer)
            console.debug(result)

            return result
        });
}


/**
 * Generate root router for /abi route
 */
export type RouterDeploy<T extends Record<string, FactoryWithInitializeUtil & TypechainFactoryWithZod>> = ReturnType<typeof t.router<{
    //@ts-expect-error
    [K in keyof T]: ReturnType<typeof generatePOSTForDeploy<T[K], T[K]["methods"]["initialize"]>>
}>>
export function generateDeployRouter<T extends Record<string, FactoryWithInitializeUtil & TypechainFactoryWithZod>>(factoriesObj: T): RouterDeploy<T> {
    const contractsWithInitialize = pickBy(factoriesObj, (f) => !!(f.methods as any)["initialize"])
    return t.router(mapValues(contractsWithInitialize, (item, k) => generatePOSTForDeploy(k, item, (item.methods as any)["initialize"]))) as any
}

type FactoriesInitWithZod = typeof abisWithZodProxiesContracts & typeof abisWithZodContracts

//@ts-expect-error
export const deployRouter = generateDeployRouter<FactoriesInitWithZod>({
    ...abisWithZodProxiesContracts,
    ...abisWithZodContracts
})
