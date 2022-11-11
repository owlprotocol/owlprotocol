/**
 * Typescript implementation of ERC1167 library pure functions
 */
import { ContractFactory, Overrides } from 'ethers';
import type { BaseContract } from 'ethers';

export type ContractParameters<
    ContractTyped extends BaseContract = BaseContract,
    InitSignature extends keyof ContractTyped | void = void,
> = InitSignature extends keyof ContractTyped
    ? //@ts-expect-error
    Parameters<ContractTyped[InitSignature]>
    : [];

export type FunctionWithOverrides<T extends (...args: any[]) => any> =
    | [...Parameters<T>]
    | [...Parameters<T>, Overrides];

export type ContractParametersWithOverrides<
    ContractTyped extends BaseContract = BaseContract,
    InitSignature extends keyof ContractTyped | void = void,
> = InitSignature extends keyof ContractTyped
    ? //@ts-expect-error
    FunctionWithOverrides<ContractTyped[InitSignature]>
    : [] | [Overrides];

export interface CustomFactory<
    ContractTyped extends BaseContract = BaseContract,
    InitSignature extends keyof ContractTyped | void = void,
> extends ContractFactory {
    deploy(...args: ContractParametersWithOverrides<ContractTyped, InitSignature>): Promise<ContractTyped>;
    getAddress(...args: ContractParameters<ContractTyped, InitSignature>): string;
    getInitData(...args: ContractParameters<ContractTyped, InitSignature>): string;
    exists(...args: ContractParameters<ContractTyped, InitSignature>): Promise<boolean>;
    attach(address: string): ContractTyped;
}
