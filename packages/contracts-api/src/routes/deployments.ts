import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { Collection } from "@owlprotocol/contracts-sdk";
import {
    addressParameter,
    networkIdAndAddressObject,
    networkIdParameter,
} from "./common.js";
import {
    getCollectionDependentsMeta,
    getCollectionMeta,
    postCollectionMeta,
} from "../procedureMeta/deployments.js";
import { t } from "../trpc.js";

const nftContractTypeZ = z
    .nativeEnum(Collection.NFTContractType)
    .describe("The type of contract");

const dnaTypeZ = z.nativeEnum(Collection.DNAType);

const collectionParameters = z.object({
    admin: addressParameter.describe("The admin address of the collection"),
    contractType: nftContractTypeZ.optional(),
    name: z.string().describe("The name of the contract. Required for ERC721"),
    symbol: z.string().describe("The token symbol"),
    royaltyAmount: z
        .number()
        .describe("ERC2981 royalty amount as a percentage (%)")
        .optional(),
    royaltyAddress: addressParameter
        .describe("ERC2981 Royalty receiver")
        .optional(),
    dnaType: dnaTypeZ.optional(),
    baseUri: z
        .string()
        .describe("Base URI for metadata")
        .optional(),
    dnaSchema: z
        .object({})
        .catchall(z.any())
        .describe("DNA schema. Required if using the DNA standard")
        .optional(),
    dnaSchemaUrl: z
        .string()
        .describe(
            "DNA schema URL. Required is using the DNA standard, and no `dnaSchema` is passed"
        ),
});

const collectionObject = z.object({
    address: z.string(),
    contractType: z.string().optional(),
});

const dependentContractsObject = z.array(
    z.object({
        contractType: z.string(),
        address: addressParameter,
    })
);

const getCollectionProcedure = t.procedure
    .meta(getCollectionMeta)
    .input(networkIdAndAddressObject)
    .output(collectionObject)
    .query(({ input }) => {
        // TODO: look for contract
        if (input.address == "0xCHANGEME") {
            throw new TRPCError({
                message: "Collection not found",
                code: "NOT_FOUND",
            });
        }

        return { address: input.address };
    });

const postCollectionProcedure = t.procedure
    .meta(postCollectionMeta)
    .input(collectionParameters.extend(networkIdParameter))
    .output(collectionObject)
    .mutation(({ input }) => {
        // TODO: deploy collection
        //
        // Collection.deployNFTCollection(null, input);

        return {
            address: "0x7777777777777777777777777777777777777777",
            contractType: input.contractType,
        };
    });

const getCollectionDependentsProcedure = t.procedure
    .meta(getCollectionDependentsMeta)
    // TODO: address validation
    .input(networkIdAndAddressObject)
    .output(dependentContractsObject)
    .query(({ input }) => {
        // TODO: look for contract
        if (input.address == "0xCHANGEME") {
            throw new TRPCError({
                message: "Collection not found",
                code: "NOT_FOUND",
            });
        }

        return [
            {
                contractType: "ERC721Minter",
                address: "0x7777777777777777777777777777777777777777",
            },
        ];
    });

export const collectionRouter = t.router({
    getCollection: getCollectionProcedure,
    postCollection: postCollectionProcedure,
    getCollectionDependents: getCollectionDependentsProcedure,
});
