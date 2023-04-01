import { interfaces } from "@owlprotocol/contracts";
import { BaseContract, ContractFunction, ContractTransaction, utils } from "ethers";
import { TypedEventFilter } from "@owlprotocol/contracts/lib/types/typechain/ethers/common.js";
import { mapValues } from "lodash-es";
import { web3CallActionFactory } from "../ethmodels/ethcall/actions/web3Call.js";
import { web3SendActionFactory } from "../ethmodels/ethsend/actions/web3Send.js";
import { web3GetPastLogsActionFactory } from "../ethmodels/ethlogquery/actions/web3GetPastLogs.js";
import {
    web3SubscribeLogsActionFactory,
    web3UnsubscribeLogsActionFactory,
} from "../ethmodels/ethlogsubscribe/actions/web3SubscribeLogs.js";
import { Contract } from "../contract/model/interface.js";
import { ContractCRUD } from "../contract/crud.js";
import { useEthCallFactory } from "../ethmodels/ethcall/hooks/useEthCall.js";
import { useEthSendFactory } from "../ethmodels/ethsend/hooks/useEthSend.js";
import { useEventsFactory } from "../ethmodels/ethlog/hooks/useEvents.js";
import { contractsWithInterfaceIdsHookFactory } from "../contract/hooks/useContractsWithInterfaceIds.js";
import { web3CallSagaFactory } from "../ethmodels/ethcall/sagas/web3Call.js";
import { getEthCallFactory } from "../ethmodels/ethcall/db/getEthCall.js";

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
    [Fn in keyof C["functions"] as C["functions"][Fn] extends ContractFunction<ContractTransaction>
        ? never
        : Fn]: C["functions"][Fn];
};
type BaseContractSendFn<C extends BaseContract> = {
    [Fn in keyof C["functions"] as C["functions"][Fn] extends ContractFunction<ContractTransaction>
        ? Fn
        : never]: C["functions"][Fn];
};

export function contractHelpersFactory<C extends BaseContract>(contract: C, interfaceId: string) {
    const iface = contract.interface;
    const abi = JSON.parse(iface.format(utils.FormatTypes.json) as any);

    const create = (contract: Omit<Contract, "abi">) => {
        return ContractCRUD.actions.create({ ...contract, abi });
    };

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

    const callDB = Object.fromEntries(
        callFnKeys.map((k) => {
            const fn = iface.getFunction(k);
            const methodFormatFull = fn.format(utils.FormatTypes.full);
            return [k, getEthCallFactory(methodFormatFull)];
        }),
    ) as unknown as {
        [Fn in keyof BaseContractCallFn<C>]: ReturnType<
            typeof getEthCallFactory<
                InitialParameters<BaseContractCallFn<C>[Fn]>,
                Awaited<ReturnType<BaseContractCallFn<C>[Fn]>>
            >
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
        callFnKeys.map((k) => {
            //const fn = iface.getFunction(k)
            //const methodFormatFull = fn.format(utils.FormatTypes.full)
            return [`use${k.charAt(0).toUpperCase() + k.slice(1)}`, useEthSendFactory()];
        }),
    ) as {
        [Fn in keyof BaseContractSendFn<C> as Fn extends string ? `use${Capitalize<Fn>}` : never]: ReturnType<
            typeof useEthSendFactory<InitialParameters<BaseContractCallFn<C>[Fn]>>
        >;
    };

    const useContracts = contractsWithInterfaceIdsHookFactory(interfaceId);

    //TODO: Initialize function for deploy

    const events = Object.fromEntries(
        Object.keys(contract.filters).map((k) => {
            const ev = iface.getEvent(k);
            const eventFormatFull = ev.format(utils.FormatTypes.full);

            //Actions
            const getPast = web3GetPastLogsActionFactory(eventFormatFull);
            const subscribe = web3SubscribeLogsActionFactory(eventFormatFull);
            const unsubscribe = web3UnsubscribeLogsActionFactory(eventFormatFull);

            //Hooks
            const useEvents = useEventsFactory(eventFormatFull);

            return [k, { getPast, subscribe, unsubscribe, useEvents }];
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
            useEvents: ReturnType<
                typeof useEventsFactory<
                    | Partial<extractTypedEventFilterArgs<ReturnType<C["filters"][Ev]>>[0]>
                    | Partial<extractTypedEventFilterArgs<ReturnType<C["filters"][Ev]>>[1]>
                >
            >;
        };
    };

    const methods = {
        ...callAction,
        ...sendAction,
        ...callHook,
        ...sendHook,
    };
    return {
        ...methods,
        ...events,
        useContracts,
        callDB,
        callSaga,
        methods,
        events,
        create,
    };
}

export const ContractHelpers = mapValues(interfaces, (iface) => {
    return contractHelpersFactory(iface.contract, iface.interfaceId);
}) as {
    [K in keyof typeof interfaces]: ReturnType<typeof contractHelpersFactory<(typeof interfaces)[K]["contract"]>>;
};

//console.debug(ContractHelpers.IERC20);
