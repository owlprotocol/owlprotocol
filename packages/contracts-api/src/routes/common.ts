import { DeploymentMethod } from "@owlprotocol/contracts-proxy";
import { z } from "zod";

const addressRegex = /0x([a-fA-F0-9]){40}/;
export const addressParameter = z
    .string()
    .regex(addressRegex)
    .describe("An ethereum address");

export const exampleAddressParameter = {
    address: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
};

export const networkIdParameter = {
    networkId: z
        .string()
        .regex(/^\d+$/)
        .describe("The network id"),
};
export const exampleNetworkIdParameter = {
    networkId: "1",
};

export const networkIdAndAddressObject = z.object({
    address: addressParameter,
    ...networkIdParameter,
});

export const exampleNetworkIdAndAddressParameters = {
    ...exampleAddressParameter,
    ...exampleNetworkIdParameter,
};

export const deploymentMethodZ = z.nativeEnum(DeploymentMethod);

export const deploymentArgsParameters = z.object({
    msgSender: addressParameter.optional(),
    salt: z
        .string()
        .describe(
            "Salt parameter string to deploy different contracts with identical parameteres (default: 1)"
        )
        .default("0x1"),
    deploymentMethod: z.nativeEnum(DeploymentMethod),
    beaconAddress: addressParameter
        .describe("The address of the beacon, if used in the deployment method")
        .optional(),
    beaonAdmin: addressParameter
        .describe(
            "The admin address of the beacon, if a new beacon is deployed"
        )
        .optional(),
});

export const transactionResponseObject = z.object({
    hash: z.string().describe("The transaction hash"),
    to: addressParameter.describe("The to address").optional(),
    from: addressParameter.describe("The from address").optional(),
    nonce: z
        .number()
        .describe("The transaction nonce")
        .optional(),
    gasLimit: z
        .string()
        .describe("The gas limit")
        .optional(),
    gasPrice: z
        .string()
        .describe("The gas price")
        .optional(),
    data: z
        .string()
        .describe("The data bytes")
        .optional(),
    value: z
        .string()
        .describe("The value")
        .optional(),
    chainId: z
        .number()
        .describe("The network id")
        .optional(),
    // TODO: add description
    // type: z.number().optional(),
    // TODO: add description
    // accessList: z.any().optional(),
});

export const deploymentResultObject = z.object({
    contractAddress: addressParameter.describe(
        "The address of the deployed contract"
    ),
    beaconAddress: addressParameter
        .describe("The address of the beacon deployed or used")
        .optional(),
    contractTx: transactionResponseObject
        .describe("The contract transaction")
        .optional(),
    beaconTx: transactionResponseObject
        .describe("The beacon transaction")
        .optional(),
});
