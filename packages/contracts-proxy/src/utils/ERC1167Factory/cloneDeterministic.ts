/**
 * Typescript implementation of ERC1167 library pure functions
 */
import { Contract, constants } from "ethers";
import type { BaseContract, UnsignedTransaction, Transaction, Signer, ContractFactory, Overrides } from "ethers";
import { FormatTypes } from "@ethersproject/abi";
import {
    ERC1167FactoryAddress, GetAddressArgs,
} from "./getAddress.js";
import { getInitData } from "./getInitData.js";
import { DEFAULT_SALT, getSalt } from "./getSalt.js";
import { ERC1167FactoryFactory } from "../../ethers/factories.js";
import * as Clones from "../Clones.js";
import { ContractParameters, ContractParametersWithOverrides, CustomFactory } from "./factory.js";
import type { TransactionReceipt } from "@ethersproject/providers";

export interface CloneDeterministicAddressArgs<
    ContractTyped extends BaseContract = BaseContract,
    InitSignature extends keyof ContractTyped | void = void,
> extends GetAddressArgs<ContractTyped, InitSignature> {
    implementationAddress: string;
}
export function cloneDeterministicAddress<
    ContractTyped extends BaseContract = BaseContract,
    InitSignature extends keyof ContractTyped | void = void,
>(args: CloneDeterministicAddressArgs<ContractTyped, InitSignature>): string {
    // Assign Config
    const { implementationAddress, salt, contractInterface, initOptions, msgSender } = args;
    const cloneFactoryAddress = args.cloneFactoryAddress ?? ERC1167FactoryAddress;

    // Setup Initializer Data
    //@ts-expect-error
    const initData = getInitData<ContractTyped, InitSignature>(contractInterface, initOptions);
    const initSalt = getSalt({ salt, initData, msgSender });

    return Clones.predictDeterministicAddress(implementationAddress, initSalt, cloneFactoryAddress);
}

export interface CloneDeterministicInput<
    ContractTyped extends BaseContract = BaseContract,
    InitSignature extends keyof ContractTyped | void = void,
> extends CloneDeterministicAddressArgs<ContractTyped, InitSignature> {
}
export async function cloneDeterministicTx<
    ContractTyped extends BaseContract = BaseContract,
    InitSignature extends keyof ContractTyped | void = void,
>(args: CloneDeterministicInput<ContractTyped, InitSignature>):
    Promise<{ address: string, txPayload: UnsignedTransaction }> {
    // Assign Config
    const { implementationAddress, contractInterface, initOptions } = args;
    const salt = args.salt ?? DEFAULT_SALT
    const cloneFactoryAddress = args.cloneFactoryAddress ?? ERC1167FactoryAddress
    const msgSender = args.msgSender ?? constants.AddressZero

    const cloneFactory = ERC1167FactoryFactory
        .attach(cloneFactoryAddress)

    // Compute address
    const address = cloneDeterministicAddress<ContractTyped, InitSignature>({
        contractInterface,
        cloneFactoryAddress,
        implementationAddress,
        initOptions,
        salt,
        msgSender,
    });

    // Compute initData
    //@ts-expect-error
    const initData = getInitData<ContractTyped, InitSignature>(contractInterface, initOptions);

    // Compute deploy tx
    const txPayload = await cloneFactory.populateTransaction.cloneDeterministic(
        implementationAddress,
        salt,
        initData,
        msgSender,
    );

    return { address, txPayload }
}

export async function cloneDeterministic<
    ContractTyped extends BaseContract = BaseContract,
    InitSignature extends keyof ContractTyped | void = void,
>(args: CloneDeterministicInput<ContractTyped, InitSignature>, signer: Signer, overrides?: Overrides):
    Promise<{ address: string, txPayload: UnsignedTransaction, contract: ContractTyped, tx?: Transaction, receipt?: TransactionReceipt }> {
    const provider = signer.provider
    if (!provider) throw new Error(`signer.provider ${provider}`)

    const from = await signer.getAddress()
    const { contractInterface } = args;
    const { address, txPayload } = await cloneDeterministicTx(args);

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

/***** EIP1167 Proxy *****/
interface ProxyFactoryArgs<
    Factory extends ContractFactory = ContractFactory,
    InitSignature extends keyof ReturnType<Factory["attach"]> | void = void,
> {
    cloneFactoryAddress?: string;
    salt?: string;
    msgSender?: string;
    initSignature?: InitSignature;
    contractFactory: Factory;
    implementationAddress: string;
}
export function cloneDeterministicFactory<
    Factory extends ContractFactory = ContractFactory,
    InitSignature extends keyof ReturnType<Factory["attach"]> | void = void,
>(args: ProxyFactoryArgs<Factory, InitSignature>, signer?: Signer) {
    const provider = signer?.provider
    // Assign Config
    const { contractFactory, initSignature, implementationAddress } = args;
    const salt = args.salt ?? DEFAULT_SALT
    const cloneFactoryAddress = args.cloneFactoryAddress ?? ERC1167FactoryAddress
    const msgSender = args.msgSender ?? constants.AddressZero

    // Init data fragment
    const contractInterface = contractFactory.interface;
    const initFragment = initSignature ? contractInterface.getFunction(initSignature as string) : undefined;
    const initArgsLen = initFragment ? initFragment.inputs.length : 0;

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
        const { contract } = await cloneDeterministic<ReturnType<Factory["attach"]>, InitSignature>(
            {
                cloneFactoryAddress,
                contractInterface,
                implementationAddress,
                salt,
                initOptions,
                msgSender,
            },
            signer,
            overrides,
        );
        return contract;
    };

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

        const { txPayload } = await cloneDeterministicTx({
            cloneFactoryAddress,
            contractInterface,
            implementationAddress,
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

    const getAddress = (...args: ContractParameters<ReturnType<Factory["attach"]>, InitSignature>) => {
        const initOptions = initSignature ? ({ initSignature, initArgs: args } as any) : undefined;
        //@ts-expect-error
        const address = cloneDeterministicAddress<ReturnType<Factory["attach"]>, InitSignature>({
            contractInterface,
            implementationAddress,
            cloneFactoryAddress,
            salt,
            initOptions,
            msgSender,
        });
        return address;
    };

    const exists = async (...args: ContractParameters<ReturnType<Factory["attach"]>, InitSignature>) => {
        if (!provider) throw new Error(`signer.provider ${provider} cannot factory.exists()`)

        const address = getAddress(...args);
        if ((await provider.getCode(address)) != "0x") return true;
        return false;
    };

    //Create new factory with new signer
    const connect = (signer: Signer) => {
        return cloneDeterministicFactory(args, signer)
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
