/**
 * Typescript implementation of ERC1167 library pure functions
 */
import { Contract, constants, Overrides } from 'ethers';
import type { ContractReceipt, BaseContract, Signer } from 'ethers';
import { FormatTypes } from '@ethersproject/abi';

import { ERC1167Factory } from '../../ethers/types.js';
import {
    cloneDeterministicAddress,
    CloneDeterministicAddressArgs,
    deployDeterministicAddress,
    DeployDeterministicAddressArgs,
} from './getAddress.js';
import { getInitData } from './getInitData.js';
import { DEFAULT_SALT } from './getSalt.js';

export interface DeployDeterministicInput<
    ContractTyped extends BaseContract = BaseContract,
    InitSignature extends keyof ContractTyped | void = void,
> extends Omit<DeployDeterministicAddressArgs<ContractTyped, InitSignature>, 'cloneFactoryAddress'> {
    cloneFactory: ERC1167Factory;
}

export async function deployDeterministic<
    ContractTyped extends BaseContract = BaseContract,
    InitSignature extends keyof ContractTyped | void = void,
>(args: DeployDeterministicInput<ContractTyped, InitSignature>, signer: Signer, overrides?: Overrides) {
    // Assign Config
    const { bytecode, salt, contractInterface, initOptions, msgSender } = args;
    const cloneFactory = args.cloneFactory;

    // Setup Initializer Data
    const address = deployDeterministicAddress<ContractTyped, InitSignature>({
        cloneFactoryAddress: cloneFactory.address,
        bytecode,
        salt,
        contractInterface,
        initOptions,
        msgSender,
    });

    // Receipt data
    let receipt: ContractReceipt | undefined;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if ((await signer.provider!.getCode(address)) == '0x') {
        //@ts-expect-error
        const initData = getInitData<ContractTyped, InitSignature>(contractInterface, initOptions);

        if (msgSender && msgSender != constants.AddressZero) {
            const tx = await cloneFactory.deployDeterministic(
                salt ?? DEFAULT_SALT,
                bytecode,
                initData,
                msgSender ?? constants.AddressZero,
                { ...overrides, from: msgSender },
            );
            receipt = await tx.wait();
        } else {
            const tx = await cloneFactory.deployDeterministic(
                salt ?? DEFAULT_SALT,
                bytecode,
                initData,
                constants.AddressZero,
                overrides ?? {},
            );
            receipt = await tx.wait();
        }
    }

    // Create Contract object for interaction
    const contract = (await new Contract(address, contractInterface.format(FormatTypes.full)).connect(
        signer,
    )) as ContractTyped;

    return { address, receipt, contract };
}

export interface CloneDeterministicInput<
    ContractTyped extends BaseContract = BaseContract,
    InitSignature extends keyof ContractTyped | void = void,
> extends Omit<CloneDeterministicAddressArgs<ContractTyped, InitSignature>, 'cloneFactoryAddress'> {
    cloneFactory: ERC1167Factory;
}
export async function cloneDeterministic<
    ContractTyped extends BaseContract = BaseContract,
    InitSignature extends keyof ContractTyped | void = void,
>(args: CloneDeterministicInput<ContractTyped, InitSignature>, signer: Signer, overrides?: Overrides) {
    // Assign Config
    const { implementationAddress, contractInterface, initOptions, salt, msgSender } = args;
    const cloneFactory = args.cloneFactory;

    // Setup Initializer Data
    const address = cloneDeterministicAddress<ContractTyped, InitSignature>({
        contractInterface,
        cloneFactoryAddress: cloneFactory.address,
        implementationAddress,
        initOptions,
        salt,
        msgSender,
    });

    // Receipt data
    let receipt;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if ((await signer.provider!.getCode(address)) == '0x') {
        //@ts-expect-error
        const initData = getInitData<ContractTyped, InitSignature>(contractInterface, initOptions);

        if (msgSender && msgSender != constants.AddressZero) {
            const tx = await cloneFactory.cloneDeterministic(
                implementationAddress,
                salt ?? DEFAULT_SALT,
                initData,
                msgSender ?? constants.AddressZero,
                { ...overrides, from: msgSender },
            );
            receipt = await tx.wait();
        } else {
            const tx = await cloneFactory.cloneDeterministic(
                implementationAddress,
                salt ?? DEFAULT_SALT,
                initData,
                constants.AddressZero,
                overrides ?? {},
            );
            receipt = await tx.wait();
        }
    }

    // Create Contract object for interaction
    const contract = new Contract(address, contractInterface.format(FormatTypes.full)).connect(signer) as ContractTyped;
    return { address, receipt, contract };
}
