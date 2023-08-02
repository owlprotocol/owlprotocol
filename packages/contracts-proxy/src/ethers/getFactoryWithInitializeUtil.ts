import type { ContractFactory, Overrides, Signer, UnsignedTransaction } from "ethers";
import { constants, ethers, utils } from "ethers";
import { DeploymentArgs, isDeploymentArgsBeaconExisting, isDeploymentArgsBeaconNew, isDeploymentArgsBeaconOwl, isDeploymentArgsDeterministic, isDeploymentArgsERC1167 } from "./deploymentArgs.js";
import { ContractParameters } from "../utils/ERC1167Factory/factory.js";
import type { getDeployFactories } from "./getFactory.js";
import { TransactionResponse } from "@ethersproject/providers";

/**
 *
 * @param contractFactory contractFactory created with getFactory, and that can use various deployment methods
 * @param initializeUtil a utility function that maps an object, to a tuple of arguments used to initialize the contract.
 * Some parameters may be optional as the utility function may have sensible defaults.
 * @returns
 */
export function getFactoryWithInitializeUtil<F extends ContractFactory, K extends Record<string, any>>(
    contractFactory: ReturnType<typeof getDeployFactories<F>>,
    initializeUtil: (args: K) => ContractParameters<ReturnType<F["attach"]>, "initialize">
) {

    /**
     *
     * @param args Object that specifies initialization parameters for contract (eg. admin, contractUri...)
     * @param deployParams
     * @returns
     */
    const getDeployTransactions = async (args: K, deployParams: DeploymentArgs) => {
        let beaconTxUnsigned: UnsignedTransaction | undefined;
        let beaconAddress: string | undefined;
        if (isDeploymentArgsBeaconOwl(deployParams)) {
            beaconAddress = contractFactory.beacon().getAddress();
        } else if (isDeploymentArgsBeaconExisting(deployParams)) {
            beaconAddress = deployParams.beaconAddress
        } else if (isDeploymentArgsBeaconNew(deployParams)) {
            const beacon = contractFactory.beacon(deployParams)
            beaconAddress = await beacon.getAddress();
            beaconTxUnsigned = await beacon.getDeployTransaction();
        }

        const factory = contractFactory.getDeployFactory(deployParams)
        const deployArgs = initializeUtil(args)
        const contractAddress = factory.getAddress(...deployArgs);
        const contractTxUnsigned = await factory.getDeployTransaction(...deployArgs)

        return {
            contractTxUnsigned,
            contractAddress,
            beaconTxUnsigned,
            beaconAddress
        }
    }

    const deploy = async (args: K, deployParams: DeploymentArgs, signer: Signer, overrides?: Overrides) => {
        const { contractTxUnsigned, contractAddress, beaconTxUnsigned, beaconAddress } = await getDeployTransactions(args, deployParams);

        const provider = signer?.provider
        if (!provider) throw new Error(`signer.provider ${provider}`)

        const from = await signer.getAddress();
        if (deployParams.msgSender &&
            deployParams.msgSender != constants.AddressZero &&
            from != deployParams.msgSender) {
            throw new Error(`msgSender (${deployParams.msgSender}) != signer.address ${from}`)
        }

        //Get nonce
        const nonceBN = (await overrides?.nonce) ?? (await provider.getTransactionCount(from))
        let nonce = ethers.BigNumber.from(nonceBN).toNumber()

        //Beacon
        let beaconTx: TransactionResponse | undefined;
        if (beaconTxUnsigned && await provider.getCode(beaconAddress!) == "0x") {
            beaconTx = await signer.sendTransaction({ ...beaconTxUnsigned, type: beaconTxUnsigned.type ?? 0, ...overrides, from, nonce: nonce++ })
        }

        //Contract
        let contractTx: TransactionResponse | undefined;
        if (await provider.getCode(contractAddress!) == "0x") {
            contractTx = await signer.sendTransaction({ ...contractTxUnsigned, type: contractTxUnsigned.type ?? 0, ...overrides, from, nonce: nonce++ })
        }

        return {
            contractTx,
            contractAddress,
            beaconTx,
            beaconAddress
        }
    }

    return {
        ...contractFactory,
        getDeployTransactions,
        deploy,
        initializeUtil,
    } as const
}

export type FactoryWithInitializeUtil<F extends ContractFactory = ContractFactory, K extends Record<string, any> = Record<string, any>> =
    ReturnType<typeof getFactoryWithInitializeUtil<F, K>>
