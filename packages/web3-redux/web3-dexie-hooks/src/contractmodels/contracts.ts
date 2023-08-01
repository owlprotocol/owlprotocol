import { interfaces } from "@owlprotocol/contracts";
import { BaseContract, ContractFunction, ContractTransaction, utils } from "ethers";
import { TypedEventFilter } from "@owlprotocol/contracts/lib/types/typechain/ethers/common.js";
import { mapValues } from "lodash-es";
import { useERC165 } from "./erc165.js";
import { useEthCallFactory } from "../ethmodels/ethcall.js";
import { useEthSendFactory } from "../ethmodels/ethsend.js";
import { useEventsFactory } from "../ethmodels/ethlog.js";

//https://stackoverflow.com/questions/71689752/how-to-reference-all-parameters-except-last-in-typescript
type Wrap<T> = { [K in keyof T]-?: [T[K]] };
type Unwrap<T> = { [K in keyof T]: Extract<T[K], [any]>[0] };
type InitialParameters<F extends (...args: any) => any> = Wrap<Parameters<F>> extends [...infer InitPs, any]
    ? Unwrap<InitPs>
    : never;

//https://stackoverflow.com/questions/44851268/typescript-how-to-extract-the-generic-parameter-from-a-type
//@ts-ignore
type extractTypedEventFilterArgs<T extends TypedEventFilter<any, any>> = T extends TypedEventFilter<
    infer ArgsArr,
    infer ArgsObj
>
    ? [ArgsArr, ArgsObj]
    : never;

//BaseContract Types
type BaseContractCallFn<C extends BaseContract> = {
    [Fn in keyof C["functions"]as C["functions"][Fn] extends ContractFunction<ContractTransaction>
    ? never
    : Fn]: C["functions"][Fn];
};
type BaseContractSendFn<C extends BaseContract> = {
    [Fn in keyof C["functions"]as C["functions"][Fn] extends ContractFunction<ContractTransaction>
    ? Fn
    : never]: C["functions"][Fn];
};

export function contractDexieHookHelpersFactory<C extends BaseContract>(contract: C, interfaceId: string) {
    const iface = contract.interface;

    const callFnKeys = Object.keys(contract.functions).filter((k) => {
        const fn = iface.getFunction(k);
        return fn.type != "constructor" && !(fn.stateMutability == "payable" || fn.stateMutability == "nonpayable");
    });
    const sendFnKeys = Object.keys(contract.functions).filter((k) => {
        const fn = iface.getFunction(k);
        return fn.type != "constructor" && (fn.stateMutability == "payable" || fn.stateMutability == "nonpayable");
    });

    const callHook = Object.fromEntries(
        callFnKeys.map((k) => {
            const fn = iface.getFunction(k);
            const methodFormatFull = fn.format(utils.FormatTypes.full);
            return [`use${k.charAt(0).toUpperCase() + k.slice(1)}`, useEthCallFactory(methodFormatFull)];
        }),
    ) as unknown as {
            [Fn in keyof BaseContractCallFn<C> as Fn extends string ? `use${Capitalize<Fn>}` : never]: ReturnType<
                typeof useEthCallFactory<
                    InitialParameters<BaseContractCallFn<C>[Fn]>,
                    Awaited<ReturnType<BaseContractCallFn<C>[Fn]>>
                >
            >;
        };

    const sendHook = Object.fromEntries(
        sendFnKeys.map((k) => {
            //const fn = iface.getFunction(k)
            //const methodFormatFull = fn.format(utils.FormatTypes.full)
            return [`use${k.charAt(0).toUpperCase() + k.slice(1)}`, useEthSendFactory()];
        }),
    ) as {
            [Fn in keyof BaseContractSendFn<C> as Fn extends string ? `use${Capitalize<Fn>}` : never]: ReturnType<
                typeof useEthSendFactory<InitialParameters<BaseContractCallFn<C>[Fn]>>
            >;
        };

    const useContracts = function () {
        return useERC165(interfaceId);
    };

    //TODO: Initialize function for deploy
    const events = Object.fromEntries(
        Object.keys(contract.filters).map((k) => {
            const ev = iface.getEvent(k);
            const eventFormatFull = ev.format(utils.FormatTypes.full);

            //Hooks
            const useEvents = useEventsFactory(eventFormatFull);

            return [k, { useEvents }];
        }),
    ) as {
            [Ev in keyof C["filters"]]: {
                useEvents: ReturnType<
                    typeof useEventsFactory<
                        | Partial<extractTypedEventFilterArgs<ReturnType<C["filters"][Ev]>>[0]>
                        | Partial<extractTypedEventFilterArgs<ReturnType<C["filters"][Ev]>>[1]>
                    >
                >;
            };
        };

    const methods = {
        ...callHook,
        ...sendHook,
    };
    return {
        ...methods,
        ...events,
        useContracts,
        methods,
        events,
    };
}

export type ContractCustomDexieHooksType = {
    [K in keyof typeof interfaces]: ReturnType<
        typeof contractDexieHookHelpersFactory<(typeof interfaces)[K]["contract"]>
    >;
};

export const ContractCustomDexieHooks = mapValues(interfaces, (v) => {
    return contractDexieHookHelpersFactory(v.contract, v.interfaceId);
}) as ContractCustomDexieHooksType;
