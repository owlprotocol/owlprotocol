import { call } from "typed-redux-saga";
import { getDB } from "../../db.js";

export function* clearSaga(): Generator<any, any, any> {
    const db = getDB();
    yield* call([db, db.clear]);
}
