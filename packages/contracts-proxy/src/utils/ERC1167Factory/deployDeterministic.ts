/**
 * Typescript implementation of ERC1167 library pure functions
 */
import { Contract, constants, utils } from "ethers";
import type { BaseContract, UnsignedTransaction, Transaction, Signer, ContractFactory, BytesLike, Overrides } from "ethers";
import { FormatTypes } from "@ethersproject/abi";
import {
    ERC1167FactoryAddress,
    GetAddressArgs,
} from "./getAddress.js";
import { getInitData } from "./getInitData.js";
import { DEFAULT_SALT, getSalt } from "./getSalt.js";
import { ERC1167FactoryFactory } from "../../ethers/factories.js";
import * as Create2 from "../Create2.js";
import { ContractParameters, ContractParametersWithOverrides, CustomFactory } from "./factory.js";
import type { TransactionReceipt } from "@ethersproject/providers";

export interface DeployDeterministicAddressArgs<
    ContractTyped extends BaseContract = BaseContract,
    InitSignature extends keyof ContractTyped | void = void,
> extends GetAddressArgs<ContractTyped, InitSignature> {
    bytecode: BytesLike;
}
export function deployDeterministicAddress<
    ContractTyped extends BaseContract = BaseContract,
    InitSignature extends keyof ContractTyped | void = void,
>(args: DeployDeterministicAddressArgs<ContractTyped, InitSignature>) {
    // Assign Config
    const { bytecode, salt, contractInterface, initOptions, msgSender } = args;
    const cloneFactoryAddress = args.cloneFactoryAddress ?? ERC1167FactoryAddress;

    // Setup Initializer Data
    //@ts-expect-error
    const initData = getInitData<ContractTyped, InitSignature>(contractInterface, initOptions);
    const initSalt = getSalt({ salt, initData, msgSender });

    // Setup Initializer Data
    const address = Create2.computeAddress(initSalt, utils.keccak256(bytecode), cloneFactoryAddress);
    return address;
}

export interface DeployDeterministicInput<
    ContractTyped extends BaseContract = BaseContract,
    InitSignature extends keyof ContractTyped | void = void,
> extends DeployDeterministicAddressArgs<ContractTyped, InitSignature> {
}
export async function deployDeterministicTx<
    ContractTyped extends BaseContract = BaseContract,
    InitSignature extends keyof ContractTyped | void = void,
>(args: DeployDeterministicInput<ContractTyped, InitSignature>):
    Promise<{ address: string, txPayload: UnsignedTransaction }> {

    // Assign Config
    const { bytecode, contractInterface, initOptions } = args;
    const salt = args.salt ?? DEFAULT_SALT
    const cloneFactoryAddress = args.cloneFactoryAddress ?? ERC1167FactoryAddress
    const msgSender = args.msgSender ?? constants.AddressZero

    const cloneFactory = ERC1167FactoryFactory
        .attach(cloneFactoryAddress)

    // Compute address
    const address = deployDeterministicAddress<ContractTyped, InitSignature>({
        cloneFactoryAddress,
        bytecode,
        salt,
        contractInterface,
        initOptions,
        msgSender,
    });

    // Compute initData
    //@ts-expect-error
    const initData = getInitData<ContractTyped, InitSignature>(contractInterface, initOptions);

    // Compute deploy tx
    const txPayload = await cloneFactory.populateTransaction.deployDeterministic(
        salt,
        bytecode,
        initData,
        msgSender,
    );

    return { address, txPayload }
}

export async function deployDeterministic<
    ContractTyped extends BaseContract = BaseContract,
    InitSignature extends keyof ContractTyped | void = void,
>(args: DeployDeterministicInput<ContractTyped, InitSignature>, signer: Signer, overrides?: Overrides):
    Promise<{ address: string, txPayload: UnsignedTransaction, contract: ContractTyped, tx?: Transaction, receipt?: TransactionReceipt }> {
    const provider = signer.provider
    if (!provider) throw new Error(`signer.provider ${provider}`)

    const from = await signer.getAddress()
    const { contractInterface } = args;
    const { address, txPayload } = await deployDeterministicTx(args);

    // Create Contract object for interaction
    const contract = (await new Contract(address, contractInterface.format(FormatTypes.full)).connect(
        signer,
    )) as ContractTyped;

    // Check if deployed
    if ((await provider!.getCode(address)) == "0x") {
        const tx = await signer.sendTransaction({ ...txPayload, type: txPayload.type ?? 0, ...overrides, from })
        const receipt = await tx.wait(1);

        return { address, txPayload, contract, tx, receipt }
    }
    return { address, txPayload, contract }
}

/***** Deterministic Deployment *****/
export interface DeterministicFactoryArgs<
    Factory extends ContractFactory = ContractFactory,
    InitSignature extends keyof ReturnType<Factory["attach"]> | void = void,
> {
    cloneFactoryAddress?: string;
    salt?: string;
    msgSender?: string;
    initSignature?: InitSignature;
    contractFactory: Factory;
}
export function deployDeterministicFactory<
    Factory extends ContractFactory = ContractFactory,
    InitSignature extends keyof ReturnType<Factory["attach"]> | void = void,
>(args: DeterministicFactoryArgs<Factory, InitSignature>, signer?: Signer) {
    const provider = signer?.provider
    // Assign Config
    const { contractFactory, initSignature } = args;
    const bytecode = contractFactory.bytecode
    const salt = args.salt ?? DEFAULT_SALT
    const cloneFactoryAddress = args.cloneFactoryAddress ?? ERC1167FactoryAddress
    const msgSender = args.msgSender ?? constants.AddressZero

    // Init data fragment
    const contractInterface = contractFactory.interface;
    const initFragment = initSignature ? contractInterface.getFunction(initSignature as string) : undefined;
    const initArgsLen = initFragment ? initFragment.inputs.length : 0;

    //Send deploy transactino
    const deploy = async (...args: ContractParametersWithOverrides<ReturnType<Factory["attach"]>, InitSignature>) => {
        if (!signer) throw new Error(`signer ${provider} cannot factory.deploy()`)

        let initArgs: any;
        let overrides: Overrides | undefined;
        if (!initSignature) {
            overrides = args[0] as Overrides;
        } else if (args.length == initArgsLen + 1) {
            initArgs = args.slice(0, args.length - 1);
            overrides = args[args.length - 1] as Overrides;
        } else {
            initArgs = args;
        }
        //Clone contract
        const initOptions = initSignature ? ({ initSignature, initArgs } as any) : undefined;
        //@ts-expect-error
        const { contract } = await deployDeterministic<ReturnType<Factory["attach"]>, InitSignature>(
            {
                cloneFactoryAddress,
                contractInterface,
                bytecode,
                salt,
                initOptions,
                msgSender,
            },
            signer,
            overrides,
        );
        return contract;
    };

    //Get deploy transaction
    const getDeployTransaction = async (...args: ContractParametersWithOverrides<ReturnType<Factory["attach"]>, InitSignature>) => {
        let initArgs: any;
        let overrides: Overrides | undefined;
        if (!initSignature) {
            overrides = args[0] as Overrides;
        } else if (args.length == initArgsLen + 1) {
            initArgs = args.slice(0, args.length - 1);
            overrides = args[args.length - 1] as Overrides;
        } else {
            initArgs = args;
        }
        //Clone contract
        const initOptions = initSignature ? ({ initSignature, initArgs } as any) : undefined;

        const { txPayload } = await deployDeterministicTx({
            cloneFactoryAddress,
            contractInterface,
            bytecode,
            salt,
            initOptions,
            msgSender,
        })

        return txPayload
    }

    const getInitData2 = (...args: ContractParameters<ReturnType<Factory["attach"]>, InitSignature>) => {
        const initOptions = initSignature ? ({ initSignature, initArgs: args } as any) : undefined;
        return getInitData(contractInterface, initOptions);
    };

    //Get address of deployed contract
    const getAddress = (...args: ContractParameters<ReturnType<Factory["attach"]>, InitSignature>) => {
        const initOptions = initSignature ? ({ initSignature, initArgs: args } as any) : undefined;
        //@ts-expect-error
        const address = deployDeterministicAddress<ReturnType<Factory["attach"]>, InitSignature>({
            contractInterface,
            bytecode,
            cloneFactoryAddress,
            salt,
            initOptions,
            msgSender,
        });
        return address;
    };

    //Check if contract exists
    const exists = async (...args: ContractParameters<ReturnType<Factory["attach"]>, InitSignature>) => {
        if (!provider) throw new Error(`signer.provider ${provider} cannot factory.exists()`)

        const address = getAddress(...args);
        if ((await provider.getCode(address)) != "0x") return true;
        return false;
    };

    //Create new factory with new signer
    const connect = (signer: Signer) => {
        return deployDeterministicFactory(args, signer)
    }

    //New factory
    const factory = contractFactory.connect(signer as any) as CustomFactory<ReturnType<Factory["attach"]>, InitSignature>;
    factory.deploy = deploy;
    factory.getDeployTransaction = getDeployTransaction;
    factory.getInitData = getInitData2;
    factory.getAddress = getAddress;
    factory.exists = exists;
    factory.connect = connect;

    return factory;
}
