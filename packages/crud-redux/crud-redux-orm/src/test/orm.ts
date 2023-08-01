import { ORM } from "redux-orm";
import { ChildORMModel } from "./child-orm.js";

export function createTestReduxORM() {
    const orm = new ORM({
        stateSelector: (state: any) => state.TestRedux,
    });
    orm.register(ChildORMModel);

    return orm;
}
//Fix undefined import issue
export const TestORM = createTestReduxORM();

/** @internal */
export const initializeTestState = (orm: any) => {
    const state = orm.getEmptyState();
    return state;
};
