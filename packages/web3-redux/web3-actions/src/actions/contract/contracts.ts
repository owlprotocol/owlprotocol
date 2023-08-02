import { interfaces } from "@owlprotocol/contracts";
import { BaseContract, ContractFunction, ContractTransaction, utils } from "ethers";
import { TypedEvent, TypedEventFilter } from "@owlprotocol/contracts/lib/types/typechain/ethers/common.js";
import { mapValues } from "lodash-es";
import { web3CallActionFactory } from "../ethmodels/ethcall/web3Call.js";
import { web3SendActionFactory } from "../ethmodels/ethsend/web3Send.js";
import { web3GetPastLogsActionFactory } from "../ethmodels/ethlogquery/web3GetPastLogs.js";
import {
    web3SubscribeLogsActionFactory,
    web3UnsubscribeLogsActionFactory,
} from "../ethmodels/ethlogsubscribe/web3SubscribeLogs.js";

//https://stackoverflow.com/questions/71689752/how-to-reference-all-parameters-except-last-in-typescript
type Wrap<T> = { [K in keyof T]-?: [T[K]] };
type Unwrap<T> = { [K in keyof T]: Extract<T[K], [any]>[0] };
type InitialParameters<F extends (...args: any) => any> = Wrap<Parameters<F>> extends [...infer InitPs, any]
    ? Unwrap<InitPs>
    : never;

//https://stackoverflow.com/questions/44851268/typescript-how-to-extract-the-generic-parameter-from-a-type
type extractTypedEventFilterArgs<T extends TypedEventFilter<TypedEvent<any, any>>> = T extends TypedEventFilter<
    TypedEvent<infer ArgsArr, infer ArgsObj>
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

export function contractActionHelpersFactory<C extends BaseContract>(contract: C) {
    const iface = contract.interface;

    const callFnKeys = Object.keys(contract.functions).filter((k) => {
        const fn = iface.getFunction(k);
        return fn.type != "constructor" && !(fn.stateMutability == "payable" || fn.stateMutability == "nonpayable");
    });
    const sendFnKeys = Object.keys(contract.functions).filter((k) => {
        const fn = iface.getFunction(k);
        return fn.type != "constructor" && (fn.stateMutability == "payable" || fn.stateMutability == "nonpayable");
    });

    const callAction = Object.fromEntries(
        callFnKeys.map((k) => {
            const fn = iface.getFunction(k);
            const methodFormatFull = fn.format(utils.FormatTypes.full);
            return [k, web3CallActionFactory(methodFormatFull)];
        }),
    ) as unknown as {
            [Fn in keyof BaseContractCallFn<C>]: ReturnType<
                typeof web3CallActionFactory<InitialParameters<BaseContractCallFn<C>[Fn]>>
            >;
        };

    const sendAction = Object.fromEntries(
        sendFnKeys.map((k) => {
            const fn = iface.getFunction(k);
            const methodFormatFull = fn.format(utils.FormatTypes.full);
            return [k, web3SendActionFactory(methodFormatFull)];
        }),
    ) as unknown as {
            [Fn in keyof BaseContractSendFn<C>]: ReturnType<
                typeof web3SendActionFactory<InitialParameters<BaseContractSendFn<C>[Fn]>>
            >;
        };

    const events = Object.fromEntries(
        Object.keys(contract.filters).map((k) => {
            const ev = iface.getEvent(k);
            const eventFormatFull = ev.format(utils.FormatTypes.full);

            //Actions
            const getPast = web3GetPastLogsActionFactory(eventFormatFull);
            const subscribe = web3SubscribeLogsActionFactory(eventFormatFull);
            const unsubscribe = web3UnsubscribeLogsActionFactory(eventFormatFull);

            return [k, { getPast, subscribe, unsubscribe }];
        }),
    ) as {
            [Ev in keyof C["filters"]]: {
                getPast: ReturnType<
                    typeof web3GetPastLogsActionFactory<
                        | Partial<extractTypedEventFilterArgs<ReturnType<C["filters"][Ev]>>[0]>
                        | Partial<extractTypedEventFilterArgs<ReturnType<C["filters"][Ev]>>[1]>
                    >
                >;
                subscribe: ReturnType<
                    typeof web3SubscribeLogsActionFactory<
                        | Partial<extractTypedEventFilterArgs<ReturnType<C["filters"][Ev]>>[0]>
                        | Partial<extractTypedEventFilterArgs<ReturnType<C["filters"][Ev]>>[1]>
                    >
                >;
                unsubscribe: ReturnType<
                    typeof web3UnsubscribeLogsActionFactory<
                        | Partial<extractTypedEventFilterArgs<ReturnType<C["filters"][Ev]>>[0]>
                        | Partial<extractTypedEventFilterArgs<ReturnType<C["filters"][Ev]>>[1]>
                    >
                >;
            };
        };

    const methods = {
        ...callAction,
        ...sendAction,
    };
    return {
        ...methods,
        ...events,
        methods,
        events,
    };
}

export const ContractCustomActions = mapValues(interfaces, (iface) => {
    return contractActionHelpersFactory(iface.contract);
}) as {
        [K in keyof typeof interfaces]: ReturnType<typeof contractActionHelpersFactory<(typeof interfaces)[K]["contract"]>>;
    };
