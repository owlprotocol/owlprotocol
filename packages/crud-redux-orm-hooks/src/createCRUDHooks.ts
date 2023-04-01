import { useSelector } from "react-redux";
import type { createCRUDSelectors } from "@owlprotocol/crud-redux-orm";

//Create CRUD Hooks.
//GOAL: Decouple crud-redux from react
/**
 *
 * Creates common CRUD actions for a Redux/Dexie model including relevant action creators & sagas.
 * Automatically infers types.
 *
 * @param name
 * @param validators Validators used to sanitize data
 * @param crudActions
 * @param crudSelectors
 * @param crudDB
 * @returns
 */
export function createCRUDHooks<
    U extends string,
    T_ID extends Record<string, any> = Record<string, any>,
    T_Encoded extends T_ID = T_ID,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    T_Idx = T_ID,
    T_Redux = T_Encoded,
>(crudSelectors: ReturnType<typeof createCRUDSelectors<U, T_ID, T_Encoded, T_Redux>>) {
    const { selectByIdSingle, selectByIdMany, selectAll, selectWhere } = crudSelectors;

    /** Redux ORM Hooks */
    const useSelectByIdSingle = (id: Partial<T_ID> | string | undefined) => {
        return useSelector((state) => selectByIdSingle(state, id));
    };
    const useSelectByIdMany = (id?: T_ID[] | string[]) => {
        return useSelector((state) => selectByIdMany(state, id));
    };
    const useSelectAll = () => {
        return useSelector((state) => selectAll(state));
    };
    const useSelectWhere = (f: Partial<T_Encoded>) => {
        return useSelector((state) => selectWhere(state, f));
    };

    const hooks = {
        useSelectByIdSingle,
        useSelectByIdMany,
        useSelectAll,
        useSelectWhere,
    };

    return hooks;
}
