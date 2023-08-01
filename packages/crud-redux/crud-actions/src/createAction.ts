import * as ReduxJSToolkit from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const { createAction } = ((ReduxJSToolkit as any).default ?? ReduxJSToolkit) as typeof ReduxJSToolkit;
export { createAction };

export function createAction2<U extends (p: any) => any = (p: any) => any, T extends string = string>(
    name: T,
    payloadCreator: U,
) {
    return createAction(name, (payload: Parameters<U>[0], uuid?: string, ts?: number) => {
        return {
            payload: payloadCreator(payload) as ReturnType<U>,
            meta: {
                uuid: uuid ?? uuidv4(),
                ts: ts ?? Date.now(),
            },
        };
    });
}
