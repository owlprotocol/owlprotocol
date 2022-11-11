import { CHILD_ATTACH, childAttachAction, ChildAttachAction, isChildAttachAction } from './childAttach.js';

/** @internal */
export type SagaAction = ChildAttachAction;
/** @internal */
export function isSagaAction(action: { type: string }): action is SagaAction {
    return isChildAttachAction(action);
}

export type { ChildAttachAction };

export { CHILD_ATTACH, childAttachAction, isChildAttachAction };
