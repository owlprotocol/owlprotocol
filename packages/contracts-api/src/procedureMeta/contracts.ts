import { OpenApiMeta } from "trpc-openapi";
import lodash from "lodash-es";
import { Ethers } from "@owlprotocol/contracts";
import { exampleNetworkIdAndAddressParameters } from "../routes/common.js";

const { mapValues } = lodash;

const exampleContractParameters = {
    contractType: "ERC721",
};

const exampleContractObject = {
    address: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
    contractType: "ERC721",
};

const exampleContractSchema = {
    generatedImageType: "png",
    traits: {
        "Member ID": {
            name: "Member ID",
            type: "number",
            description: "Owner's membership ID",
            min: 1000000,
            max: 99999999999,
            abi: "uint48",
        },
        "Status Tier": {
            name: "Status Tier",
            type: "enum",
            description:
                "Status tier in the loyalty program, can be one of: Bronze, Silver or Gold",
            options: ["Bronze", "Silver", "Gold"],
        },
    },
};

const exampleContractMetadata = {
    name: "Owls",
    description: "Owls are lovely nocturnal animals.",
    image: "owlprotocol.xyz/image.png",
    ...exampleContractSchema,
};

export const exampleDeploymentArgs = {
    msgSender: "0x434C7df2f06D6CD172a28cb71e2AFE6E1b974DBC",
    salt: "0x1",
    deploymentMethod: "DETERMINISTIC",
    beaconAddress: "0xedc97f90eb5ad5722106feeca86cca08ed62787d",
    beaonAdmin: "0xdbfbc8701eefe726d7733c8726ab499720bde8a8",
};

export const exampleERC2981SetterContractArgs = {
    admin: "0x434C7df2f06D6CD172a28cb71e2AFE6E1b974DBC",
    contractUri: "example.com/contract",
    gsnForwarder: "0xe1775adad7221d55ca3dcbbbcffcde9b0aade737",
    royaltyReceiver: "0xf8b9eec568dbfb4ad01e108322461a9f2f4bc35c",
    feeNumerator: "0",
};

export const exampleERC721MintableAutoIdContractArgs = {
    admin: "0x434C7df2f06D6CD172a28cb71e2AFE6E1b974DBC",
    contractUri:
        "https://leovigna.mypinata.cloud/ipfs/QmbUcD2MRhHYVwEw3YEX3izMzVvZfT49CGfLhqdVRVcnZd",
    gsnForwarder: "0xe1775adad7221d55ca3dcbbbcffcde9b0aade737",
    name: "My ERC721MintableAutoId contract",
    symbol: "EG",
};

export const interfaceExamples = {
    ERC2981Setter: {
        request: {
            networkId: "1",
            deploymentArgs: exampleDeploymentArgs,
            contractArgs: exampleERC2981SetterContractArgs,
        },
    },
    ERC20Mintable: {
        request: { networkId: "1", deploymentArgs: exampleDeploymentArgs },
    },
    ERC721Mintable: {
        request: { networkId: "1", deploymentArgs: exampleDeploymentArgs },
    },
    ERC721MintableAutoId: {
        request: {
            networkId: "1",
            deploymentArgs: exampleDeploymentArgs,
            contractArgs: exampleERC721MintableAutoIdContractArgs,
        },
    },
    ERC1155Mintable: {
        request: { networkId: "1", deploymentArgs: exampleDeploymentArgs },
    },
    TokenURI: {
        request: { networkId: "1", deploymentArgs: exampleDeploymentArgs },
    },
    TokenURIBaseURI: {
        request: { networkId: "1", deploymentArgs: exampleDeploymentArgs },
    },
    TokenURIDna: {
        request: { networkId: "1", deploymentArgs: exampleDeploymentArgs },
    },
    TokenDna: {
        request: { networkId: "1", deploymentArgs: exampleDeploymentArgs },
    },
    AssetRouterCraft: {
        request: { networkId: "1", deploymentArgs: exampleDeploymentArgs },
    },
    AssetRouterInput: {
        request: { networkId: "1", deploymentArgs: exampleDeploymentArgs },
    },
    AssetRouterOutput: {
        request: { networkId: "1", deploymentArgs: exampleDeploymentArgs },
    },
};

export const getContractMeta: OpenApiMeta = {
    openapi: {
        method: "GET" as const,
        path: "/{networkId}/contract/{address}" as const,
        description: "Returns contract information",
        summary: "Get contract interface by address",
        tags: ["contract"],
        example: {
            request: exampleNetworkIdAndAddressParameters,
            response: exampleContractObject,
        },
    },
};

export const postContractMeta: OpenApiMeta = {
    openapi: {
        method: "POST" as const,
        path: "/{networkId}/contract" as const,
        summary: "Deploy a contract",
        tags: ["contract"],
        example: {
            request: exampleContractParameters,
            response: exampleContractObject,
        },
    },
};

export const putContractMeta: OpenApiMeta = {
    openapi: {
        method: "PUT" as const,
        path: "/{networkId}/contract/{address}" as const,
        summary: "Mutate a contract",
        tags: ["contract"],
        example: {
            request: exampleContractParameters,
            response: exampleContractObject,
        },
    },
};

export const getContractMetadataMeta: OpenApiMeta = {
    openapi: {
        method: "GET" as const,
        path: "/{networkId}/contract/{address}/metadata" as const,
        summary: "Get a contract's metadata",
        description: "Gets a contract's metadata from its contractURI",
        tags: ["contract"],
        example: {
            request: exampleNetworkIdAndAddressParameters,
            response: exampleContractMetadata,
        },
    },
};

export const putContractMetadataMeta: OpenApiMeta = {
    openapi: {
        method: "PUT" as const,
        path: "/{networkId}/contract/{address}/metadata" as const,
        summary: "Mutate a contract's metadata and change the contractURI",
        description:
            "Mutates a contract's metadata, and updates the contract's `contractURI` to point to the new metadata",
        tags: ["contract"],
        example: {
            request: {
                ...exampleNetworkIdAndAddressParameters,
                exampleContractMetadata,
            },
            response: exampleContractMetadata,
        },
    },
};

export const getContractSchemaMeta: OpenApiMeta = {
    openapi: {
        method: "GET" as const,
        path: "/{networkId}/contract/{address}/schema" as const,
        summary: "Get a contract's DNA schema",
        description: "Gets a contract's DNA schema from its contractURI.",
        tags: ["contract"],
        example: {
            request: exampleNetworkIdAndAddressParameters,
            response: exampleContractSchema,
        },
    },
};

export const putContractSchemaMeta: OpenApiMeta = {
    openapi: {
        method: "PUT" as const,
        path: "/{networkId}/contract/{address}/schema" as const,
        summary: "Mutate a contract's schema and change the contractURI",
        description:
            "Mutates a contract's schema, and updates the contract's `contractURI` to point to the new metadata",
        tags: ["contract"],
        example: {
            request: {
                ...exampleNetworkIdAndAddressParameters,
                exampleContractSchema,
            },
            response: exampleContractSchema,
        },
    },
};

export const supportsInterfaceMeta: OpenApiMeta = {
    openapi: {
        method: "GET" as const,
        path: "/{networkId}/contractInterface/ERC165/{address}/supportsInterface/{interfaceIdOrName}" as const,
        summary: "Return address supports for an interface",
        description:
            "Returns whether an address supports an ERC165 interface. Accepts an interface id or name. The address must support ERC165",
        tags: ["contract"],
        // TODO: add example input and output
        example: {},
    },
};

export const postInterfacesMeta = mapValues(Ethers.factoriesAll, (_, iface) => {
    return {
        openapi: {
            method: "POST" as const,
            path: `/{networkId}/contractInterface/${iface}` as const,
            summary: `Deploys ${iface}` as const,
            description: `Deploys an ${iface} contract` as const,
            tags: ["contract"],
            examples: {
                request: {},
            },
        },
    };
}) as {
    [K in keyof typeof Ethers.factoriesAll]: OpenApiMeta;
};
