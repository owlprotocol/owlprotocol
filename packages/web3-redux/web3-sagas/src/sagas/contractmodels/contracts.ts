import { interfaces } from "@owlprotocol/contracts";
import { BaseContract, ContractFunction, ContractTransaction, utils } from "ethers";
import { mapValues } from "lodash-es";
import { web3CallSagaFactory } from "../ethmodels/ethcall/web3Call.js";

//https://stackoverflow.com/questions/71689752/how-to-reference-all-parameters-except-last-in-typescript
type Wrap<T> = { [K in keyof T]-?: [T[K]] };
type Unwrap<T> = { [K in keyof T]: Extract<T[K], [any]>[0] };
type InitialParameters<F extends (...args: any) => any> = Wrap<Parameters<F>> extends [...infer InitPs, any]
    ? Unwrap<InitPs>
    : never;

//BaseContract Types
type BaseContractCallFn<C extends BaseContract> = {
    [Fn in keyof C["functions"]as C["functions"][Fn] extends ContractFunction<ContractTransaction>
    ? never
    : Fn]: C["functions"][Fn];
};

export function contractSagaHelpersFactory<C extends BaseContract>(contract: C) {
    const iface = contract.interface;

    const callFnKeys = Object.keys(contract.functions).filter((k) => {
        const fn = iface.getFunction(k);
        return fn.type != "constructor" && !(fn.stateMutability == "payable" || fn.stateMutability == "nonpayable");
    });

    const callSaga = Object.fromEntries(
        callFnKeys.map((k) => {
            const fn = iface.getFunction(k);
            const methodFormatFull = fn.format(utils.FormatTypes.full);
            return [k, web3CallSagaFactory(methodFormatFull)];
        }),
    ) as unknown as {
            [Fn in keyof BaseContractCallFn<C>]: ReturnType<
                typeof web3CallSagaFactory<
                    InitialParameters<BaseContractCallFn<C>[Fn]>,
                    Awaited<ReturnType<BaseContractCallFn<C>[Fn]>>
                >
            >;
        };

    return {
        callSaga,
    };
}

export const ContractSagaHelpers = mapValues(interfaces, (iface) => {
    return contractSagaHelpersFactory(iface.contract);
}) as {
        [K in keyof typeof interfaces]: ReturnType<typeof contractSagaHelpersFactory<(typeof interfaces)[K]["contract"]>>;
    };

//log.debug(ContractCustomActions.IERC20);
