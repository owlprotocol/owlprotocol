import { AbiParam } from "../abi/abiParam.js";

export function functionParamsObjToTuple<T extends readonly AbiParam[]>(params: any, paramsAbi: T) {
    const paramsTuple = [] as any[]
    //loop abi by index, pick by name or (idx not implemented yet regardless)
    paramsAbi.forEach((param, idx) => {
        const paramByKey = params[param.name as keyof typeof params];
        if (paramByKey != undefined) return paramsTuple.push(paramByKey);

        const paramByIdx = params[`${idx}` as keyof typeof params];
        if (paramByIdx != undefined) return paramsTuple.push(paramByIdx);

        //TODO: Push param by index of abi for unnamed parameters
        throw Error(`Parameter params.${param.name} and params[${idx}] undefined`);
    });

    return paramsTuple;
}

export function functionParamsTupleToObj<T extends readonly AbiParam[]>(params: any, paramsAbi: T) {
    const paramsObj = {} as any
    //loop abi by index, pick by name or (idx not implemented yet regardless)
    paramsAbi.forEach((param, idx) => {
        const paramByKey = params[param.name as keyof typeof params];
        if (paramByKey != undefined) return paramsObj[param.name] = paramByKey;

        const paramByIdx = params[`${idx}` as keyof typeof params];
        if (paramByIdx != undefined) return paramsObj[idx] = paramByIdx;

        //TODO: Push param by index of abi for unnamed parameters
        throw Error(`Parameter params.${param.name} and params[${idx}] undefined`);
    });

    console.debug({ params, paramsObj, paramsAbi})

    return paramsObj;
}
