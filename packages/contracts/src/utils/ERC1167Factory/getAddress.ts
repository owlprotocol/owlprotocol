/**
 * Typescript implementation of ERC1167 library pure functions
 */
import { utils } from 'ethers';
import type { BytesLike, BaseContract } from 'ethers';

import * as Create2 from '../Create2.js';
import * as Clones from '../Clones.js';
import { ERC1167Factory as ERC1167FactoryArtifact } from '../../artifacts.js';

import { getInitData, GetInitDataArgs } from './getInitData.js';
import { getSalt, DEFAULT_SALT } from './getSalt.js';
import { proxyAddress } from '../DeployerDeterministic.js';

const ERC1167FactoryBytecodeHash = utils.keccak256(ERC1167FactoryArtifact.bytecode);
export const ERC1167FactoryAddress = Create2.computeAddress(DEFAULT_SALT, ERC1167FactoryBytecodeHash, proxyAddress);

export interface GetAddressArgs<
    ContractTyped extends BaseContract = BaseContract,
    InitSignature extends keyof ContractTyped | void = void,
> {
    cloneFactoryAddress?: string;
    salt?: string;
    msgSender?: string;
    contractInterface: ContractTyped['interface'];
    initOptions?: InitSignature extends keyof ContractTyped ? GetInitDataArgs<ContractTyped, InitSignature> : undefined;
}

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
