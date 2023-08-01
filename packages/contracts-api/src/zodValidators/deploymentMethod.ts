import { DeploymentMethod } from "@owlprotocol/contracts-proxy";
import { addressZod } from "@owlprotocol/zod-sol";
import { z } from "zod";

export const saltZod = z
    .string()
    .describe(
        "Salt parameter string to deploy different contracts with identical parameteres (default: 1)"
    )
    .default("0x1");

export const deploymentMethodZod = z.nativeEnum(DeploymentMethod);

export const deployParamsZod = z.object({
    msgSender: addressZod.optional(),
    salt: saltZod,
    deploymentMethod: deploymentMethodZod,
    beaconAddress: addressZod
        .describe("The address of the beacon, if used in the deployment method")
        .optional(),
    beaonAdmin: addressZod
        .describe(
            "The admin address of the beacon, if a new beacon is deployed"
        )
        .optional(),
});

export const transactionResponseZod = z.object({
    hash: z.string().describe("The transaction hash"),
    to: addressZod.describe("The to address").optional(),
    from: addressZod.describe("The from address").optional(),
    nonce: z
        .number()
        .describe("The transaction nonce")
        .optional(),
    //gasLimit: z.string().describe("The gas limit").optional(),
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

export const deployResultZod = z.object({
    contractAddress: addressZod.describe(
        "The address of the deployed contract"
    ),
    beaconAddress: addressZod
        .describe("The address of the beacon deployed or used")
        .optional(),
    contractTx: transactionResponseZod
        .describe("The contract transaction")
        .optional(),
    beaconTx: transactionResponseZod
        .describe("The beacon transaction")
        .optional(),
});
