import { ORM } from 'redux-orm';

//Fix undefined import issue
export const orm = new ORM({
    stateSelector: (state: any) => state.crudDexie,
});

/** @internal */
export const initializeState = (orm: any) => {
    const state = orm.getEmptyState();
    return state;
};
