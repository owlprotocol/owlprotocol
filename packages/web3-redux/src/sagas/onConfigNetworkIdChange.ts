import { liveQuery } from "dexie";
import { call } from "typed-redux-saga";
import { ConfigCRUD } from "../config/crud.js";
import { getDB } from '../db.js';

export function* onConfigNetworkIdChange() {
    const db = getDB()

    const observable = liveQuery(
        () => db.Config.get('0')
    );

    const config = yield* call(ConfigCRUD.db.get, '0')
    let networkId = config?.networkId

    const subscription = observable.subscribe(
        (value) => {
            if (networkId != value?.networkId) {
                console.debug(`networkId ${networkId} => ${value?.networkId}`)
                networkId = value?.networkId
            }
        },
        (err) => {
            console.error(err)
        }
    )

}
