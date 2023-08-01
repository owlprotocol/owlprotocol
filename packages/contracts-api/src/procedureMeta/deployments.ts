import { OpenApiMeta } from "trpc-openapi";
import { exampleTokenObject } from "./common.js";
import {
    exampleAddressParameter,
    exampleNetworkIdAndAddressParameters,
    exampleNetworkIdParameter,
} from "../routes/common.js";

const exampleCollectionParameters = {
    contractType: "ERC721",
};

const exampleCollectionObject = {
    address: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
    contractType: "ERC721",
};

const exampleCollectionRequest = {
    ...exampleCollectionParameters,
    ...exampleNetworkIdParameter,
};

const exampleDependentContractsObject = [
    {
        contractType: "ERC721Minter",
        address: "0x7777777777777777777777777777777777777777",
    },
];

const exampleCollectionMintObject = {
    address: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
    to: "0x7777777777777777777777777777777777777777",
};

const exampleInputAddressParameter = {
    inputAddress: "0x7777777777777777777777777777777777777777",
};

const exampleOutputAddressParameter = {
    outputAddress: "0x7777777777777777777777777777777777777777",
};

const exampleRecipeParameters = {
    ...exampleInputAddressParameter,
    ...exampleOutputAddressParameter,
};

export const getCollectionMeta: OpenApiMeta = {
    openapi: {
        method: "GET" as const,
        path: "/{networkId}/deployment/collection/{address}" as const,
        summary: "Get collection deployment",
        description:
            "Gets collection deployment information. Address must be a contract deployed by Owl",
        tags: ["deployment"],
        example: {
            request: exampleNetworkIdAndAddressParameters,
            response: exampleCollectionObject,
        },
    },
};

export const postCollectionMeta: OpenApiMeta = {
    openapi: {
        method: "POST" as const,
        path: "/{networkId}/deployment/collection" as const,
        summary: "Create an Owl NFT collection deployment",
        description:
            "Creates a deployment of Owl contracts for an NFT collection",
        tags: ["deployment"],
        example: {
            request: exampleCollectionRequest,
            response: exampleCollectionObject,
        },
    },
};

export const getCollectionDependentsMeta: OpenApiMeta = {
    openapi: {
        method: "GET" as const,
        path: "/{networkId}/deployment/collection/{address}/dependents" as const,
        summary: "Get dependent Owl contracts",
        description:
            "Gets dependent Owl contracts. Address must be a contract deployed by Owl",
        tags: ["deployment"],
        example: {
            request: exampleNetworkIdAndAddressParameters,
            response: exampleDependentContractsObject,
        },
    },
};

export const collectionMintMeta: OpenApiMeta = {
    openapi: {
        method: "POST" as const,
        path: "/{networkId}/deployment/collection/{address}/token" as const,
        summary: "Mint an NFT from a collection",
        description:
            "Mints an NFT from a collection. If the contract supports DNA, the body must contain DNA, attributes, or a `generateRandomDNA: true`",
        tags: ["deployment"],
        example: {
            request: exampleCollectionMintObject,
            response: exampleTokenObject,
        },
    },
};

export const getRecipeMeta: OpenApiMeta = {
    openapi: {
        method: "GET" as const,
        path: "/{networkId}/deployment/recipe/{inputAddress}/{outputAddress}" as const,
        summary: "Get a recipe by input and output address",
        description:
            "Get a recipe by the input router address and the output router address",
        tags: ["deployment"],
        example: {
            request: exampleRecipeParameters,
        },
    },
};
