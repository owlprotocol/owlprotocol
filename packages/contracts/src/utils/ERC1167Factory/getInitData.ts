/**
 * Typescript implementation of ERC1167 library pure functions
 */
import type { BaseContract } from "ethers";
import type { ContractParameters } from "./factory.js";

const DEFAULT_INIT_SIGNATURE = "initialize";

export interface GetInitDataArgs<
    ContractTyped extends BaseContract = BaseContract,
    InitSignature extends keyof ContractTyped | void = void,
> {
    initSignature?: InitSignature;
    initArgs?: ContractParameters<ContractTyped, InitSignature>;
}
export function getInitData<
    ContractTyped extends BaseContract = BaseContract,
    InitSignature extends keyof ContractTyped | void = void,
>(contractInterface: ContractTyped["interface"], initOptions?: GetInitDataArgs<ContractTyped, InitSignature>) {
    if (!initOptions) return "0x";
    const { initSignature, initArgs } = initOptions;

    if (!initArgs) {
        return contractInterface.encodeFunctionData((initSignature as string) ?? DEFAULT_INIT_SIGNATURE);
    } else {
        return contractInterface.encodeFunctionData((initSignature as string) ?? DEFAULT_INIT_SIGNATURE, initArgs);
    }
}

export interface GetInitDataEncoderArgs<
    ContractTyped extends BaseContract = BaseContract,
    InitSignature extends keyof ContractTyped | void = void,
> {
    initSignature?: InitSignature;
}
export function getInitDataEncoder<
    ContractTyped extends BaseContract = BaseContract,
    InitSignature extends keyof ContractTyped | void = void,
>(contractInterface: ContractTyped["interface"], initSignature: InitSignature) {
    return (...initArgs: ContractParameters<ContractTyped, InitSignature>) => {
        return getInitData<ContractTyped, InitSignature>(contractInterface, { initSignature, initArgs });
    };
}
