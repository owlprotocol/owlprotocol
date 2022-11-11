import {
    GET_INTERFACE_IMPLEMENTER,
    getInterfaceImplementer,
    GetInterfaceImplementerAction,
    isGetInterfaceImplementerAction,
} from './getInterfaceImplementer.js';
import {
    GET_INTERFACE_IMPLEMENTERS,
    getInterfaceImplementers,
    GetInterfaceImplementersAction,
    isGetInterfaceImplementersAction,
} from './getInterfaceImplementers.js';
import {
    SET_INTERFACE_IMPLEMENTERS,
    setInterfaceImplementers,
    SetInterfaceImplementersAction,
    isSetInterfaceImplementersAction,
} from './setInterfaceImplementers.js';

/** @internal */
export type SagaAction =
    | GetInterfaceImplementerAction
    | GetInterfaceImplementersAction
    | SetInterfaceImplementersAction;
/** @internal */
export function isSagaAction(action: { type: string }): action is SagaAction {
    return (
        isGetInterfaceImplementerAction(action) ||
        isGetInterfaceImplementersAction(action) ||
        isSetInterfaceImplementersAction(action)
    );
}

export type { GetInterfaceImplementerAction, GetInterfaceImplementersAction, SetInterfaceImplementersAction };

export {
    GET_INTERFACE_IMPLEMENTER,
    getInterfaceImplementer as getInterfaceImplementer,
    isGetInterfaceImplementerAction,
    GET_INTERFACE_IMPLEMENTERS,
    getInterfaceImplementers as getInterfaceImplementers,
    isGetInterfaceImplementersAction,
    SET_INTERFACE_IMPLEMENTERS,
    setInterfaceImplementers as setInterfaceImplementers,
    isSetInterfaceImplementersAction,
};
