import { factoriesAll } from "@owlprotocol/contracts";
import { DeploymentArgs } from "@owlprotocol/contracts-proxy";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
    addressParameter,
    deploymentArgsParameters,
    deploymentResultObject,
    networkIdAndAddressObject,
    networkIdParameter,
} from "./common.js";
import {
    getContractMeta,
    interfaceExamples,
    postContractMeta,
    postInterfacesMeta,
} from "../procedureMeta/contracts.js";
import { getSigner } from "../providers.js";
import { t } from "../trpc.js";

// TODO: add parameters to contract
const contractParams = z.object({
    contractType: z.string(),
});

const contractOutput = contractParams.extend({ address: addressParameter });

const erc2981SetterContractArgs = z.object({
    admin: addressParameter.describe("The admin address of the collection"),
    contractUri: z.string().optional(),
    gsnForwarder: addressParameter.describe("The GSN forwarder address").optional(),
    royaltyRole: z.string().describe("The write role for royalties").optional(),
    royaltyReceiver: addressParameter.describe("The address of the original royalty receiver").optional(),
    feeNumerator: z.string().regex(/^\d+$/).default("0").describe("The fee numerator").optional(),
});

const postERC2981SetterInput = z.object({
    ...networkIdParameter,
    contractArgs: erc2981SetterContractArgs,
    deploymentArgs: deploymentArgsParameters,
});

const postERC2981SetterOutput = z.object({
    contractArgs: erc2981SetterContractArgs,
    deploymentArgs: deploymentArgsParameters,
    deploymentResult: deploymentResultObject,
});

/*
const erc721MintableAutoIdContractArgs = z.object({
    admin: addressParameter.describe("The admin address of the collection"),
    contractUri: z.string().optional(),
    gsnForwarder: addressParameter.describe("The GSN forwarder address").optional(),
    name: z.string().describe("The name of the contract").optional(),
    symbol: z.string().describe("The token symbol"),
    tokenUriProvider: addressParameter.describe("The contract that provides the token URIs").optional(),
    tokenRoyaltyProvider: addressParameter.describe("The contract that provides the token royalties").optional(),
});
*/

const getContractProcedure = t.procedure
    .meta(getContractMeta)
    .input(networkIdAndAddressObject)
    .output(
        z.object({
            address: z.string(),
            contractType: z.string().optional(),
        }),
    )
    .query(({ input }) => {
        // TODO: look for contract
        if (input.address == "0xCHANGEME") {
            throw new TRPCError({
                message: "Contract not found",
                code: "NOT_FOUND",
            });
        }

        return { address: input.address };
    });

const postContractProcedure = t.procedure
    .meta(postContractMeta)
    .input(contractParams.extend(networkIdParameter))
    .output(contractOutput)
    .mutation(({ input }) => {
        // TODO: deploy contract

        return {
            contractType: input.contractType,
            address: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
        };
    });

export type Deployment = {
    contractTx: import("@ethersproject/providers").TransactionResponse | undefined;
    contractAddress: string;
    beaconTx: import("@ethersproject/providers").TransactionResponse | undefined;
    beaconAddress: string | undefined;
};

// TODO: FIX THIS HACK
const postERC2981SetterMeta = postInterfacesMeta.ERC2981Setter;
postERC2981SetterMeta.openapi!.example = interfaceExamples.ERC2981Setter;
export const postERC2981SetterProcedure = t.procedure
    .meta(postInterfacesMeta.ERC2981Setter)
    .input(postERC2981SetterInput)
    .output(postERC2981SetterOutput)
    .mutation(async ({ input }) => {
        const deployment = await factoriesAll.ERC2981Setter.deploy(
            input.contractArgs,
            input.deploymentArgs as DeploymentArgs,
            getSigner(input.networkId),
        );
        if (!deployment.contractTx) {
            throw new TRPCError({
                message: "Error deploying contract",
                code: "INTERNAL_SERVER_ERROR",
            });
        }

        const networkIdInt = parseInt(input.networkId);

        const { contractTx, beaconTx } = deployment;
        let wrappedBeaconTx;
        if (beaconTx) {
            wrappedBeaconTx = {
                chainId: networkIdInt,
                hash: beaconTx.hash,
                to: beaconTx.to,
                from: beaconTx.from,
                nonce: beaconTx.nonce,
                // TODO: consider returning this, need to figure out casting
                // gasLimit: beaconTx.gasLimit,
                // gasPrice: beaconTx.gasPrice,
                // data: beaconTx.data,
                // value: beaconTx.value,
            };
        }

        const wrappedContractTx = {
            chainId: networkIdInt,
            hash: contractTx.hash,
            to: contractTx.to,
            from: contractTx.from,
            nonce: contractTx.nonce,
            // TODO: consider returning this, need to figure out casting
            // gasLimit: contractTx.gasLimit,
            // gasPrice: contractTx.gasPrice,
            // data: contractTx.data,
            // value: contractTx.value,
        };

        return {
            contractArgs: input.contractArgs,
            deploymentArgs: input.deploymentArgs,
            deploymentResult: {
                beaconAddress: deployment.beaconAddress,
                beaconTx: wrappedBeaconTx,
                contractAddress: deployment.contractAddress,
                contractTx: wrappedContractTx,
            },
        };
    });

export const contractRouter = t.router({
    getContract: getContractProcedure,
    postContract: postContractProcedure,
    postERC2981Setter: postERC2981SetterProcedure,
});
